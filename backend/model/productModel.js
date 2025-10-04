import mongoose from "mongoose";

// creating schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  bestSeller: {
    type: Boolean,
  },
  date: {
    type: Number,
    required: true,
  },
});

// model for gievn schema
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);
// menas if product model is avalible then it will get used & if it is not avalible it creates new by productSchema

export default productModel;