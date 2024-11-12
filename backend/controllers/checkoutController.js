const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
  [
    1,
    {
      priceInCents: 500,
      name: "Beginner Public Workshop",
      baseDescription: "A beginner-level workshop open to the public.",
    },
  ],
  [
    2,
    {
      priceInCents: 200,
      name: "Master CSS",
      baseDescription: "An advanced CSS workshop to master styling.",
    },
  ],
  // Additional items can be added here
]);

// Function to generate random child name
const getRandomChildName = () => {
  const names = ["Alice", "Bob", "Charlie", "Daisy", "Ethan"];
  return names[Math.floor(Math.random() * names.length)];
};

// Function to generate random selected date
const getRandomDate = () => {
  const today = new Date();
  const randomDaysAhead = Math.floor(Math.random() * 30) + 1; // 1 to 30 days ahead
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + randomDaysAhead);
  return futureDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

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

        // Generate random child name and selected date
        const childName = getRandomChildName();
        const selectedDate = getRandomDate();

        return {
          price_data: {
            currency: "sgd", // Use SGD for PayNow
            product_data: {
              name: storeItem.name,
              description: `${storeItem.baseDescription}\nChild: ${childName}\nSelected Date: ${selectedDate}`, // Add line breaks here
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
