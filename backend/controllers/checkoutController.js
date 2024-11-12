const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Master CSS" }],
  // Additional items can be added here
]);

const createCheckoutSession = async (req, res) => {
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
            currency: "sgd", // Use SGD for PayNow
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
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCheckoutSession };
