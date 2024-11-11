require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const dbConfig = require("./dbConfig"); // import dbConfig
const cors = require("cors");
const bodyParser = require("body-parser");
const authMiddleware = require("./middlewares/authMiddleware");
const { createCheckoutSession } = require("./controllers/checkoutController");
const customerController = require("./controllers/customerController");
const childController = require("./controllers/childController");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Stripe Checkout Route (No Authentication Required)
app.post("/create-checkout-session", createCheckoutSession);

// Customer Routes (Require Authentication)
app.get("/customers/:id", authMiddleware, customerController.getCustomerById);
app.post("/customers", authMiddleware, customerController.createCustomer);
app.put("/customers/:id", authMiddleware, customerController.updateCustomer);
app.delete("/customers/:id", authMiddleware, customerController.deleteCustomer);

// Child Routes (Require Authentication)
app.get(
  "/children/customer/:customerID",
  authMiddleware,
  childController.getChildrenByCustomerID
);
app.post("/children", authMiddleware, childController.createChild);
app.put("/children/:id", authMiddleware, childController.updateChild);
app.delete("/children/:id", authMiddleware, childController.deleteChild);

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
