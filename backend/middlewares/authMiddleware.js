//  const { requireAuth } = require("@clerk/express");

//  const authMiddleware = (req, res, next) => {
//    requireAuth()(req, res, () => {
//     if (!req.auth?.userId) {
//        console.error("User ID is missing. Ensure Clerk is correctly configured.");
//        return res.status(401).json({ message: "Unauthorized" });
//      }
// // Attach the authenticated user ID to the request
//     req.userId = req.auth.userId;
//    next();
//   });
// };

//  module.exports = authMiddleware;




