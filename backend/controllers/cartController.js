// to save orders info in DB

import userModel from "../model/userModel.js";

// add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    console.log("Request body:", { userId, itemId, size }); // DEBUG

    const userData = await userModel.findById(userId);
    console.log("User found:", userData); // DEBUG

    let cartData = userData.cartData;
    console.log("Current cartData:", cartData); // DEBUG

    // logic for add to cart
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    console.log("Updated cartData:", cartData); // DEBUG

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log("Error:", error);
    res.json({ success: false, message: error.message });
  }
};
// update products to user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message }); // Fixed: should be false
  }
};

// get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message }); // Fixed: should be false
  }
};

export { addToCart, updateCart, getUserCart };
