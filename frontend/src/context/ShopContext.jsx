// in context file we save all the common variables and state variables

import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const shopContext = createContext();

const ShopContextProvider = (props) => {
  const currancy = "$";
  const delivery_fees = 10;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  // Function to load cart data from backend
  const getUserCartData = async (userToken) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token: userToken } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
        // console.log(
        //   "✅ Cart data loaded from backend:",
        //   response.data.cartData
        // );
        
      }
    } catch (error) {
      console.log("Error loading cart:", error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Kindely Select Your Size First");
      return;
    }

    // console.log("🔥 addToCart called with:", { itemId, size });
    // console.log("🔥 Token exists?", !!token, "Value:", token);

    let cartData = structuredClone(cartItems);
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
    setCartItems(cartData);

    // console.log("🔥 About to check token...");

    if (token) {
      // console.log("🔥 Token found, making API call...");
      try {
        // console.log("Sending to backend:", { itemId, size });
        // console.log("Token:", token);

        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );

        // console.log("Backend response:", response.data);

        if (response.data.success) {
          toast.success("Added to cart");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("Error:", error);
        console.log("Error response:", error.response?.data);
        toast.error(error.response?.data?.message || error.message);
      }
    } else {
      console.log("🔥 No token found - user not logged in?");
    }
  };

  const getCartCnt = () => {
    let totalCnt = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCnt += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCnt;
  };

  const updateQty = async (itemId, size, qty) => {
    let cartDataCpy = structuredClone(cartItems);
    cartDataCpy[itemId][size] = qty;
    setCartItems(cartDataCpy);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity: qty },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmt = () => {
    let totalAmt = 0;

    for (const productId in cartItems) {
      const itemInfo = products.find((product) => product._id === productId);
      if (!itemInfo) continue;

      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (qty > 0) {
          totalAmt += itemInfo.price * qty;
        }
      }
    }

    return totalAmt;
  };

  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/listProduct`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // Load token and cart data on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getUserCartData(storedToken);
      // console.log("✅ Token and cart data loaded from localStorage");
    }
  }, []);

  const value = {
    products,
    currancy,
    delivery_fees,
    search,
    showSearch,
    setSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCnt,
    updateQty,
    getCartAmt,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems,
  };

  return (
    <shopContext.Provider value={value}>{props.children}</shopContext.Provider>
  );
};

export default ShopContextProvider;
