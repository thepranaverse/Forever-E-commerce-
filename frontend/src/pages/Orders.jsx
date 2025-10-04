import React, { useContext } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currancy } = useContext(shopContext);
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => {
           console.log("item:", item);
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
                   <p>Quantity : 1</p>
                   <p>Size : M</p>
                 </div>
                 <p className="mt-2">
                   Date: <span className="text-gray-400">2 Sept 2025</span>
                 </p>
               </div>
             </div>

             {/* Middle - Status */}
             <div className="flex items-center gap-2 mx-auto md:mx-0">
               <span className="w-2 h-2 rounded-full bg-green-500"></span>
               <p className="text-sm md:text-base capitalize">Ready to ship</p>
             </div>

             {/* Right - Button */}
             <div>
               <button className="px-3 py-1 border rounded">Track Order</button>
             </div>
           </div>
         );



        })}
      </div>
    </div>
  );
};

export default Orders;
