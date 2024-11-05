require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Ensure this key is set in .env
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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

// Static route for programs (Replace with DB query as needed)
app.get("/programs", (req, res) => {
  res.json([
    {
      programID: 1,
      name: "Public Speaking",
      description:
        "Transform your child into a seasoned stage storyteller through comprehensive training.",
      programPrice: 500.0,
    },
    {
      programID: 2,
      name: "Creative Writing",
      description:
        "Nurture and develop young creative writers through workshops and sessions.",
      programPrice: 700.0,
    },
    {
      programID: 3,
      name: "Math Enrichment",
      description:
        "Challenge and inspire students with engaging math activities and concepts.",
      programPrice: 900.0,
    },
  ]);
});

// Start server and connect to database
app.listen(port, async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Connected to the database.");
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await sql.close();
  console.log("Database connection closed.");
  process.exit(0);
});
