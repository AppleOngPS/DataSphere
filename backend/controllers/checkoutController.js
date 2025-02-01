const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { userID, scheduleID, totalAmount, children } = req.body; // ✅ Ensure these are provided

  if (!userID || !scheduleID || !totalAmount || !children) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["paynow", "card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "sgd",
            product_data: {
              name: "Booking Payment",
              description: "Payment for selected workshop with children",
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      // ✅ Ensure correct query parameters are encoded and passed
      success_url: `${process.env.CLIENT_URL}/createBooking?userID=${encodeURIComponent(userID)}&scheduleID=${encodeURIComponent(scheduleID)}&totalAmount=${encodeURIComponent(totalAmount)}&children=${encodeURIComponent(JSON.stringify(children))}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCheckoutSession };
