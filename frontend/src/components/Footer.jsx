import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm text-gray-600">
      <div>
        <img src={assets.logo} className="mb-5 w-32" alt="" />
        <p className="w-full md:w-2/3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
          dolorum cupiditate...
        </p>
      </div>

      <div>
        <p className="text-xl font-medium mb-5 text-black">COMPANY</p>
        <ul className="flex flex-col gap-1">
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Contact Us</li>
        </ul>
      </div>

      <div>
        <p className="text-xl font-medium mb-5 text-black">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1">
          <li>+1-212-456-7890</li>
          <li>cobra12@gmail.com</li>
        </ul>
      </div>

      <div className="col-span-full">
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ Me_$Pranay.dev - All Right Reserved.
        </p>
      </div>
      
    </div>
  );
};

export default Footer;
