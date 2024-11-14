const clerkClient = require("@clerk/clerk-sdk-node"); // Clerk SDK to interact with Clerk
const Clerk = require("../models/Clerk"); // Import Clerk model for database operations

// Function to sync Clerk users into your database
const syncUsers = async (req, res) => {
  try {
    // Fetch all users from Clerk
    const users = await clerkClient.users.getUserList({ limit: 100 });

    // Iterate through the list of users and insert/update them in the database
    const userPromises = users.map(async (user) => {
      const { id, emailAddresses, firstName, lastName, publicMetadata } = user;
      const role = publicMetadata?.role || "user"; // Default role if not specified

      // Insert or update user data into the endUsers table
      await Clerk.storeUserInDB(
        id,
        `${firstName} ${lastName}`,
        emailAddresses[0]?.emailAddress,
        role
      );
    });

    // Wait for all insertions to complete
    await Promise.all(userPromises);

    res.status(200).json({ message: "Users synced successfully!" });
  } catch (error) {
    console.error("Error syncing users:", error);
    res.status(500).json({ message: "Error syncing users." });
  }
};

// Function to handle Clerk webhook events
const handleWebhook = async (req, res) => {
  try {
    const event = JSON.parse(req.body);

    // Handle specific Clerk events based on event type
    if (event.type === "user.created") {
      const { id, email_addresses, first_name, last_name, public_metadata } =
        event.data;
      const role = public_metadata?.role || "user";

      // Store the new user in the database
      await Clerk.storeUserInDB(
        id,
        `${first_name} ${last_name}`,
        email_addresses[0]?.email_address,
        role
      );
    } else if (event.type === "user.updated") {
      const { id, email_addresses, first_name, last_name, public_metadata } =
        event.data;
      const role = public_metadata?.role || "user";

      // Update the user in the database
      await Clerk.updateUserInDB(
        id,
        `${first_name} ${last_name}`,
        email_addresses[0]?.email_address,
        role
      );
    } else if (event.type === "user.deleted") {
      const { id } = event.data;

      // Delete the user from the database
      await Clerk.deleteUserFromDB(id);
    }

    res.status(200).send("Webhook handled successfully.");
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).json({ message: "Error handling webhook." });
  }
};

module.exports = {
  syncUsers,
  handleWebhook,
};
