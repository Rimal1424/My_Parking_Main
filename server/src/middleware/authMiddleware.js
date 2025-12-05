const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header
  const token = req.header("Authorization") || req.header("authorization") || req.query.token || req.body.token;
  console.log("🔵 Received Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Access Denied! No token provided." });
  }

  try {
    // Remove 'Bearer ' prefix if present
    const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    console.log("🔵 Clean Token:", cleanToken);

    // Verify token using JWT_SECRET from the environment variables
    const verified = jwt.verify(cleanToken, process.env.JWT_SECRET);
    req.user = verified; // Attach the decoded token (e.g. { id, iat, exp }) to req.user
    
    // 🔍 CRITICAL DEBUG LOGS
    console.log("✅ Verified User Object:", req.user);
    console.log("✅ User ID:", req.user.id);
    console.log("✅ User Role:", req.user.role);
    console.log("✅ Role Type:", typeof req.user.role);
    console.log("✅ Role Exists?:", req.user.role !== undefined);
    
    // Alert if role is missing
    if (!req.user.role) {
      console.log("⚠️  WARNING: Token does NOT contain role field!");
      console.log("⚠️  User needs to logout and login again to get new token");
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("❌ JWT Error:", error.message);
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
