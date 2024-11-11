require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const { clerkMiddleware, requireAuth } = require("@clerk/express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(clerkMiddleware({ apiKey: process.env.CLERK_BACKEND_API_KEY }));

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

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Master CSS" }],
  // Add more items as necessary, matching the WorkshopPage items
]);

// Route to create a checkout session
app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["paynow"], // Use PayNow as the payment method
      mode: "payment",
      line_items: items.map((item) => {
        const storeItem = storeItems.get(item.id);
        if (!storeItem) {
          throw new Error(`Item with id ${item.id} not found.`);
        }
        return {
          price_data: {
            currency: "sgd", // PayNow requires SGD as the currency
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error("Error creating checkout session:", e.message);
    res.status(500).json({ error: e.message });
  }
});

// User profile endpoint
app.post("/user/profile", async (req, res) => {
  const { preferredLunch, children, userId } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    await pool
      .request()
      .input("userId", sql.VarChar, userId)
      .input("preferredLunch", sql.VarChar, preferredLunch).query(`
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
        .input("interest", sql.VarChar, child.interest).query(`
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
    const pool = await sql.connect(dbConfig);
    const userProfile = await pool
      .request()
      .input("userId", sql.VarChar, userId)
      .query("SELECT * FROM user_profiles WHERE userId = @userId");

    const childrenData = await pool
      .request()
      .input("userId", sql.VarChar, userId)
      .query(
        "SELECT name, school, interest FROM children WHERE userId = @userId"
      );

    res.status(200).json({
      userProfile: userProfile.recordset[0],
      children: childrenData.recordset,
    });
  } catch (err) {
    console.error("Error retrieving profile data:", err.message);
    res.status(500).json({ message: "Error retrieving profile data" });
  }
});

// Start server and connect to the database
app.listen(port, async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});
