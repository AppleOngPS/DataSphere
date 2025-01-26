const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { totalAmount } = req.body; // Get the total amount from the request body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["paynow", "card"], // Use PayNow as the payment method
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "sgd", // Use SGD for PayNow
            product_data: {
              name: "Booking Payment",
              description: "Payment for selected workshop with children",
            },
            unit_amount: totalAmount, // Use the amount from the frontend
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/userDashboard`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCheckoutSession };
