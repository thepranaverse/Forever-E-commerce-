import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/UserRoute.js";
import productRouter from "./routes/ProductRoute.js";

// App config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json()); //after providing this all the req we will get is gets parsed using json
app.use(cors()); // we can access backend from any ip

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("API working");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
