import React, { useContext, useState, useEffect } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "../components/ProductItems";

const BestSeller = () => {
  const { products } = useContext(shopContext);
  console.log("Products from context:", products);

  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestSeller);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quidem,
          nostrum impedit ea, aliquid debitis numquam laboriosam modi eligendi
          optio magnam nemo quasi assumenda dicta recusandae qui. Nihil, ipsa
          nemo.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItems
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );

};

export default BestSeller;
