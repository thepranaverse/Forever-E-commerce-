import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { currancy } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const responce = await axios.get(backendUrl + "/api/product/listProduct");
      if (responce.data.success) {
        setList(responce.data.products);
      } else {
        toast.error(responce.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/product/removeProduct",
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <h4 className="mt-2 font-medium">All Products</h4>
      <div className="flex flex-col gap-2">
        {/* ---------------list table title------------------ */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border rounded bg-gray-100 tetx-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ---------------Display Products----------------- */}
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border rounded text-sm]"
            >
              <img className="w-12" src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currancy}
                {item.price}
              </p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center cursor-pointer text-lg font-medium"
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
