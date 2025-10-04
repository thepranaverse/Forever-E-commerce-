import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { shopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const { navigate } = useContext(shopContext);

  const [method, setMethod] = useState('cod'); // cash on delivery by default  
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:st-14 min-h-[80vh] border-t">
      {/* -------left side------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
        <div className="text-xl sm:text-2xl my-3 mt-10 ">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        {/* form  */}
        <div className="flex gap-3">
          {/* Form Fields */}
          <form className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="First name"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            />

            <input
              type="text"
              placeholder="Street"
              className="w-full p-2  border border-gray-300 rounded-md outline-none"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="City"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
              <input
                type="text"
                placeholder="State"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Zipcode"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
              <input
                type="text"
                placeholder="Country"
                className="w-full p-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Phone"
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            />
          </form>
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
            <button onClick={()=>navigate('/orders')} className="bg-black text-white px-16 py-3 text-sm cursor-pointer">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
