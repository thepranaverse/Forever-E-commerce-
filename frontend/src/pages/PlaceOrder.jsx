import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { shopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmt,
    delivery_fees,
    products,
  } = useContext(shopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const initPay = (order, orderDbId) => {
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    // Verify key is loaded
    if (!razorpayKey) {
      toast.error("Payment gateway configuration error");
      console.error("Razorpay key not found in environment variables");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        console.log("Payment Response:", response);

        try {
          // Verify payment on backend
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            toast.success("Payment Successful!");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          console.error("Verification error:", error);
          toast.error("Payment verification failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
      toast.error(`Payment failed: ${response.error.description}`);
    });

    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmt() + delivery_fees,
      };

      // Check minimum for Stripe/Razorpay
      const MINIMUM_ONLINE_PAYMENT = 50;
      if (
        (method === "stripe" || method === "razorpay") &&
        orderData.amount < MINIMUM_ONLINE_PAYMENT
      ) {
        toast.error(
          `Minimum order amount for online payment is ₹${MINIMUM_ONLINE_PAYMENT}. Please add more items or use Cash on Delivery.`
        );
        return;
      }

      switch (method) {
        case "cod":
          const res = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (res.data.success) {
            toast.success("Order Placed Successfully!");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }
          break;

        case "stripe":
          const resStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );

          if (resStripe.data.success) {
            const { session_url } = resStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(resStripe.data.message);
          }
          break;

        case "razorpay":
          const resRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );

          if (resRazorpay.data.success) {
            initPay(resRazorpay.data.order, resRazorpay.data.orderId);
          } else {
            toast.error(resRazorpay.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:st-14 min-h-[80vh] border-t"
    >
      {/* -------left side------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
        <div className="text-xl sm:text-2xl my-3 mt-10 ">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        {/* form  */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName}
                type="text"
                placeholder="First name"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
              <input
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                type="text"
                placeholder="Last name"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <input
              required
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              type="email"
              placeholder="Email address"
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            />

            <input
              required
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
              type="text"
              placeholder="Street"
              className="w-full p-2  border border-gray-300 rounded-md outline-none"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                required
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
                type="text"
                placeholder="City"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
              <input
                required
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
                type="text"
                placeholder="State"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                required
                onChange={onChangeHandler}
                name="zipCode"
                value={formData.zipCode}
                type="text"
                placeholder="Zipcode"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
              <input
                required
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
                type="text"
                placeholder="Country"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <input
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
              type="text"
              placeholder="Phone"
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            />
          </div>
        </div>
      </div>
      {/* -------Right side------- */}
      <div className="mt-10 ">
        <div className="mt-8 min-w-120 ">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ----------------payment options-------------- */}
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="Razorpay"
              />
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          {/* button */}
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
