import express from "express";
import {
  addProduct,
  listProducts,
  removeProducts,
  singleproductInfo,
} from "../controllers/productController.js";
import upload from "../middelware/multer.js";
import adminAuth from "../middelware/adminAuth.js";

const productRouter = express.Router();

// Add Product (with file upload)
productRouter.post(
  "/addProduct",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// Other routes (no file upload needed)
productRouter.post("/removeProduct", adminAuth, removeProducts);
productRouter.post("/productInfo", singleproductInfo);
productRouter.get("/listProduct", listProducts);

export default productRouter;
