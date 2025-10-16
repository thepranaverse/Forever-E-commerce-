import React, { useContext, useState, useEffect } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

// Note :  here we only able to see 3 items becuse we set the limit anyway all orderd items you
//         can able to see on admin orders page 

const Orders = () => {
  const { backendUrl, token, currancy } = useContext(shopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const res = await axios.post(
        backendUrl + "/api/order/userOrders",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        const allOrdersItem = [];
        res.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.slice(1, 4).map((item, index) => {
          //  console.log("item:", item);
          return (
            <div
              key={index}
              className="py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* Left Side - Product Info */}
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-600">
                    <p className="text-lg">
                      {currancy}
                      {item.price}
                    </p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size : {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-2">
                    Payment:{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Middle - Status */}
              <div className="flex items-center gap-2 mx-auto md:mx-0">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm md:text-base capitalize">{item.status}</p>
              </div>

              {/* Right - Button */}
              <div>
                <button onClick={loadOrderData} className="px-3 py-1 border rounded">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
