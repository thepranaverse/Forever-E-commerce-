import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(shopContext);
  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currState === "Sign Up") {
        const res = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          pwd: password, // Backend expects "pwd"
        });
        // if register succesfully saved the token
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success("Account created successfully!");
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      } else {
        // Login
        const res = await axios.post(backendUrl + "/api/user/login", {
          email,
          pwd: password, // Backend expects "pwd"
        });

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success("Logged in successfully!");
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  // Check if user is already logged in
useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (token) {
    // Already logged in, redirect away from login page
    navigate("/");
  } else if (storedToken && !token) {
    // Token exists in storage but not in state, load it
    setToken(storedToken);
  }
}, [token, navigate, setToken]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currState === "Login" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px] text-black">
        <p className="cursor-pointer">Forget Your Password?</p>
        {currState === "Login" ? (
          <p
            onClick={() => setCurrState("Sign Up")}
            className="cursor-pointer text-black"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrState("Login")}
            className="cursor-pointer text-black"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
