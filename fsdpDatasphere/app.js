const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const { clerkMiddleware, requireAuth } = require("@clerk/express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Ensure this key is set in .env
require("dotenv").config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(clerkMiddleware({ apiKey: process.env.CLERK_BACKEND_API_KEY }));

// Connect to SQL Server
sql.connect(dbConfig)
  .then((pool) => {
    if (pool.connected) {
      console.log("Connected to SQL Server database successfully.");
    }

    app.use(requireAuth());

    app.use((req, res, next) => {
      console.log("Request Authorization Header:", req.headers.authorization); // Debugging: Log authorization header
      console.log("User ID from Clerk Middleware:", req.auth?.userId); // Debugging: Log user ID from Clerk

      if (!req.auth?.userId) {
        console.error("User ID is missing. Ensure Clerk is correctly configured.");
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.userId = req.auth.userId;
      next();
    });

    // Route to create a PayNow payment (for QR code generation)
    app.post("/create-paynow-payment", async (req, res) => {
      try {
        const { amount, currency } = req.body; // Get amount and currency from request

        const paymentIntent = await stripe.paymentIntents.create({
          amount, // Amount in cents
          currency: currency || "sgd",
          payment_method_types: ["paynow"], // Specify PayNow as payment method
        });

        res.send({
          clientSecret: paymentIntent.client_secret, // Required to confirm payment
          qrCode: paymentIntent.next_action.display_qr_code.qr_code_url, // PayNow QR Code URL
        });
      } catch (error) {
        console.error("Error creating PayNow payment:", error);
        res.status(500).send({ error: error.message });
      }
    });

    // Stripe Webhook Endpoint
    app.post(
      "/webhook",
      bodyParser.raw({ type: "application/json" }),
      (req, res) => {
        const payload = req.body;
        const sig = req.headers["stripe-signature"];

        let event;

        try {
          event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
          );
        } catch (err) {
          console.log("Webhook signature verification failed:", err.message);
          return res.sendStatus(400);
        }

        // Handle the event
        switch (event.type) {
          case "payment_intent.succeeded":
            console.log("Payment was successful:", event.data.object);
            break;
          case "payment_intent.payment_failed":
            console.log("Payment failed:", event.data.object);
            break;
          default:
            console.log(`Unhandled event type ${event.type}`);
        }

        // Send 200 status to acknowledge receipt
        res.status(200).send("Received webhook event");
      }
    );

    // User profile endpoint
    app.post("/user/profile", async (req, res) => {
      const { preferredLunch, children, userId } = req.body;

      try {
        await pool
          .request()
          .input("userId", sql.VarChar, userId)
          .input("preferredLunch", sql.VarChar, preferredLunch)
          .query(`
            MERGE INTO user_profiles AS target
            USING (SELECT @userId AS userId, @preferredLunch AS preferredLunch) AS source
            ON target.userId = source.userId
            WHEN MATCHED THEN
              UPDATE SET target.preferredLunch = source.preferredLunch
            WHEN NOT MATCHED THEN
              INSERT (userId, preferredLunch) VALUES (source.userId, source.preferredLunch);
          `);

        for (const child of children) {
          await pool
            .request()
            .input("userId", sql.VarChar, userId)
            .input("name", sql.VarChar, child.name)
            .input("school", sql.VarChar, child.school)
            .input("interest", sql.VarChar, child.interest)
            .query(`
              MERGE INTO children AS target
              USING (SELECT @userId AS userId, @name AS name) AS source
              ON target.userId = source.userId AND target.name = source.name
              WHEN MATCHED THEN
                UPDATE SET target.school = @school, target.interest = @interest
              WHEN NOT MATCHED THEN
                INSERT (userId, name, school, interest)
                VALUES (@userId, @name, @school, @interest);
            `);
        }

        res.status(200).json({ message: "Profile data saved successfully" });
      } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ message: "Database error: " + err.message });
      }
    });

    // Endpoint to get user profile data
    app.get("/user/profile", async (req, res) => {
      const userId = req.userId;
      try {
        const userProfile = await pool.request()
          .input("userId", sql.VarChar, userId)
          .query("SELECT * FROM user_profiles WHERE userId = @userId");

        const childrenData = await pool.request()
          .input("userId", sql.VarChar, userId)
          .query("SELECT name, school, interest FROM children WHERE userId = @userId");

        res.status(200).json({ userProfile: userProfile.recordset[0], children: childrenData.recordset });
      } catch (err) {
        console.error("Error retrieving profile data:", err.message);
        res.status(500).json({ message: "Error retrieving profile data" });
      }
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(err => console.error("SQL Connection Error:", err));
