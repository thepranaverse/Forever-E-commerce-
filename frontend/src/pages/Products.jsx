import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import { assets, products } from "../assets/assets";
import "../index.css";
import RelatedProducts from "../components/RelatedProducts";

const Products = () => {
  const { productId } = useParams();
  // console.log(productId);
  const { products, currancy ,addToCart} = useContext(shopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.find((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        // console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ------------------product data------------ */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* -----------------product images----------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll no-scrollbar justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => {
              return (
                <img
                  src={item}
                  key={index}
                  onClick={() => setImage(item)}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt=""
                />
              );
            })}
          </div>
          {/* ------------same img show in big-----------  */}
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* --------------product info..-------------- */}
        <div className="flex-1  ">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(125)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currancy}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select-Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => {
                return (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-200 ${
                      item === size ? "border-orange-500" : " "
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id ,size)}
            className="bg-black text-white px-8 py-3 active:bg-gray-700 "
          >
            Add To Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <p className="mt-5 text-gray-500 md:w-4/5 text-sm font-medium">
            100% Original product.
          </p>
          <p className="mt-1 text-gray-500 md:w-4/5 text-sm font-medium">
            Cash on delivery is available on this product.
          </p>
          <p className="mt-1 text-gray-500 md:w-4/5 text-sm font-medium">
            Easy return and exchange policy within 7 days.
          </p>
        </div>
      </div>

      {/* -------------------description & review section------------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm ">Description</b>
          <p className="border px-5 py-3 text-sm font-normal ">Reviews (125)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 border text-sm text-gray-400">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
            consectetur eligendi veritatis ratione eveniet iste suscipit, fugiat
            nesciunt atque quibusdam eaque, illum laboriosam eum itaque
            voluptatem autem ducimus doloribus dicta.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            laborum excepturi sit quaerat assumenda temporibus, odio quibusdam
            amet asperiores magnam ducimus, aperiam vitae dolorem corporis ab
            minus iusto natus unde!
          </p>
        </div>

        {/* ----------------display Relatedd products--------- */}
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Products;
