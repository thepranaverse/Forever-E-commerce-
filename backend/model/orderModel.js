import mongoose from "mongoose";

// creating schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Order Placed",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  payment: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Number,
    required: true,
  },
});

// model for gievn schema
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
// menas if product model is avalible then it will get used & if it is not avalible it creates new by productSchema

export default orderModel;
