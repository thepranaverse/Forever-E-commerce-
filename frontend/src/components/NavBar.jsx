import React, { useContext } from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { shopContext } from "../context/ShopContext";

const NavBar = () => {
  const [visible, setVisible] = useState("false");
  const { setShowSearch, getCardCnt } = useContext(shopContext);
  return (
    <div>
      <div className="flex items-center justify-between py-5 font-medium ">
        <Link to={"/"}>
          <img src={assets.logo} alt="" className="w-36" />
        </Link>
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col item-center gap-1">
            <p>HOME</p>
            <hr className=" border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/collection" className="flex flex-col item-center gap-1">
            <p>COLLECTION</p>
            <hr className=" border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col item-center gap-1">
            <p>ABOUT</p>
            <hr className=" border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col item-center gap-1">
            <p>CONTACT</p>
            <hr className=" border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt=""
          />

          <div className="relative group">
            <Link to={'/login'}>
              <img
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt=""
              />
            </Link>

            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black ">My Profile</p>
                <p className="cursor-pointer hover:text-black ">Orders</p>
                <p className="cursor-pointer hover:text-black ">LogOut</p>
              </div>
            </div>
          </div>
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCardCnt()}
            </p>
          </Link>
          <img
            onClick={() => {
              setVisible(true);
            }}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt=""
          />
        </div>
        {/* dynamic sidebar menu for small screen alredy do settings by visible usestaate */}

        <div
          className={`fixed top-0 right-0 h-full bg-white shadow-md transition-all duration-300 ease-in-out
    ${visible ? "w-64 translate-x-0" : "w-64 translate-x-full"}`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center p-3 gap-4 cursor-pointer"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt=""
              />
              <p>Close</p>
            </div>

            <nav className="flex flex-col gap-4 p-4">
              <Link to="/" onClick={() => setVisible(false)}>
                Home
              </Link>
              <Link to="/collection" onClick={() => setVisible(false)}>
                Collection
              </Link>
              <Link to="/about" onClick={() => setVisible(false)}>
                About
              </Link>
              <Link to="/contact" onClick={() => setVisible(false)}>
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
