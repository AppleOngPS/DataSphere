const Membership = require("../models/Membership");

const getMembershipByUserId = async (req, res) => {
    try {
      const userID = req.params.id;

      if (!userID) {
        console.error("❌ Error: userID is undefined or missing in request params.");
        return res.status(400).json({ message: "User ID is required." });
      }

      console.log("📌 Fetching membership for user:", userID);

      const membership = await Membership.getByUserId(userID);

      if (!membership) {
        console.log(`❌ No membership found for user ${userID}`);
        return res.status(200).json({ isActive: false });
      }

      console.log("📌 Query Result:", membership);

      // ✅ Validate `ValidityEnd`
      if (!membership.ValidityEnd) {
        console.error(`❌ Error: ValidityEnd is missing for user ${userID}`);
        return res.status(500).json({ message: "Membership data is incomplete." });
      }

      // ✅ Convert `ValidityEnd` properly
      const validityEndDate = new Date(membership.ValidityEnd);
      if (isNaN(validityEndDate.getTime())) {
        console.error(`❌ Error: Invalid ValidityEnd format for user ${userID}:`, membership.ValidityEnd);
        return res.status(500).json({ message: "Invalid membership expiration date." });
      }

      // ✅ Force UTC for accurate comparison
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);
      validityEndDate.setUTCHours(0, 0, 0, 0);

      console.log(`📅 Current Date (UTC): ${currentDate.toISOString()}`);
      console.log(`📅 Validity End Date (UTC): ${validityEndDate.toISOString()}`);

      // ✅ Determine if membership is active
      const isActive = validityEndDate >= currentDate;
      console.log(`✅ User ${userID} Membership Status:`, isActive ? "Active" : "Expired");

      return res.status(200).json({ ...membership, isActive });
    } catch (error) {
      console.error("❌ Error in getMembershipByUserId:", error);
      return res.status(500).json({ message: "Error fetching membership data" });
    }
};
// ✅ Create Membership
const createMembership = async (req, res) => {
  try {
    const { userID, validityEnd, discountRate } = req.body;

    if (!userID || !validityEnd) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const membershipID = await Membership.createMembership(userID, validityEnd, discountRate);
    return res.status(201).json({ message: "Membership created successfully", membershipID });
  } catch (error) {
    console.error("Error in createMembership:", error);
    return res.status(500).json({ message: "Error creating membership" });
  }
};

// ✅ Update Membership Validity
const updateMembershipValidity = async (req, res) => {
  try {
    const { userID, newValidityEnd } = req.body;

    if (!userID || !newValidityEnd) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await Membership.updateValidity(userID, newValidityEnd);
    return res.status(200).json({ message: "Membership validity updated successfully" });
  } catch (error) {
    console.error("Error in updateMembershipValidity:", error);
    return res.status(500).json({ message: "Error updating membership validity" });
  }
};

// ✅ Remove Expired Memberships
const cleanupExpiredMemberships = async (req, res) => {
  try {
    const deleted = await Membership.removeExpiredMemberships();
    if (!deleted) {
      return res.status(200).json({ message: "No expired memberships found." });
    }
    return res.status(200).json({ message: "Expired memberships removed successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Error removing expired memberships", details: error.message });
  }
};

module.exports = {
  getMembershipByUserId,
  createMembership,
  updateMembershipValidity,
  cleanupExpiredMemberships
};
