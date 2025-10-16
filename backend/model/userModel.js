// used for auth..
import mongoose from "mongoose";

// creating schema(properties of user)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pwd: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      required: true,
      default: {}, // whenever new user created cart is empty
    },
  },
  { minimize: false }
);

// model for gievn schema
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
// menas if product model is avalible then it will get used & if it is not avalible it creates new by productSchema

export default userModel;
