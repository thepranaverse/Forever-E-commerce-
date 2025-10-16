// logic using taht we can allow user to create an acc. and login on website
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not exists! Register yourself",
      });
    }
    const isMatch = await bcrypt.compare(pwd, user.pwd);
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token });
    } else {
      // if pwd is not match (user tyoe wrong pwd)
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log("Login err", error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, pwd } = req.body;
    // checking user already exists or not
    const exists = await userModel.findOne({ email });
    // if exists
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validation for email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Plz enter a valid Email" });
    }
    // Make password validation less strict
    if (pwd.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    // hashing users password
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(pwd, salt);

    // create new user
    const newUser = new userModel({
      name,
      email,
      pwd: hashPwd,
    });

    const user = await newUser.save(); // as new user gets genrated the _id also genrates which used in tokens

    // providing tokens by which user can login the page
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log("Register err", error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req,res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }
    else {
      res.json({ success: false, message:"Invalid Credentials" });
    }
    // console.log("Env:", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    // console.log("Received:", email, password);

  } catch (error) {
    console.log("Register err", error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
