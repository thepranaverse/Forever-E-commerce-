import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Verify from "./pages/Verify.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />{" "}
        {/* to add some notifications/pop-ups in our project */}
        <NavBar /> {/*navbar before Routes so it is visisble in all pages... */}
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/collection" element={<Collection />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/products/:productId" element={<Products />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/place-order" element={<PlaceOrder />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
