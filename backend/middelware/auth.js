// authenticate user whenever user add,update ,place order cart data
// this middelware converts the user's token into user's id

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  // console.log(
  //   "🔍 Auth middleware - Token received:",
  //   token ? "EXISTS" : "MISSING"
  // ); // Add this

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    // console.log("🔍 Attempting to verify token..."); // Add this
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("🔍 Token decoded:", token_decode); // Add this
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("🔍 Token verification failed:", error.message); // Add this
    res.json({ success: false, message: error.message });
  }
};

export default authUser;