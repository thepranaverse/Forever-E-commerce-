import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/UserRoute.js";
import productRouter from "./routes/ProductRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/ordersRoute.js";

// App config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json()); //after providing this all the req we will get is gets parsed using json
// CORS Configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
