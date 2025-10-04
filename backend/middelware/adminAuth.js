import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "token expired Login again" });
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      res.json({ success: false, message: "token expired Login again" });
    } else {
      next();
    }
  } catch (error) {
    console.log("Register err", error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
