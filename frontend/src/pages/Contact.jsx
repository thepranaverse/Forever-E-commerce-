import React from 'react'
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsSletterBox from "../components/NewsSletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <b className="text-2xl text-gray-700">Our Store</b>
          <p className=" text-gray-500">
            54709 Willms Station
            <br />
            Suite 350, Washington, USA
          </p>
          <p className=" text-gray-500">
            Tel: (415) 555-0132 <br /> Email: cobra12@gmail.com
          </p>
          <b className="text-2xl text-gray-700">Careers at Forever</b>
          <p className=" text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsSletterBox/>
    </div>
  );
}

export default Contact