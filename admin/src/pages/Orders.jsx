import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const url = backendUrl + "/api/order/list";
      const res = await axios.post(url, {}, { headers: { token } });

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Orders ({orders.length})</h2>

      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow bg-white"
            >
              {/* Order Header */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={assets.parcel_icon}
                  alt="Parcel"
                  className="w-12 h-12"
                />
                <div className="flex-1">
                  <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                  <p className="text-sm text-gray-600">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{order.address.email}</p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <p className="font-bold text-lg">${order.amount}</p>

                  {/* Status Dropdown */}
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t pt-3">
                <p className="font-semibold mb-2">Items:</p>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-3 mb-2">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} | Size: {item.size} | $
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment & Date & Address */}
              <div className="border-t pt-3 mt-3 flex justify-between items-start">
                <div className="text-sm text-gray-600">
                  <p>Payment: {order.paymentMethod}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>

                <div className="text-sm text-gray-600 text-right max-w-md">
                  <p>
                    <span className="font-semibold">Delivery Address: </span>
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state} {order.address.zipcode},{" "}
                    {order.address.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
