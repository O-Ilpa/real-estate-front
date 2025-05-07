import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useAuth } from "./contextApi";
const LogIn = () => {
  const {login} = useAuth()
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  let BACKAPI;
  if (import.meta.env.MODE === "development") {
    BACKAPI = import.meta.env.VITE_DEVELOPMENT_API;
  } else {
    BACKAPI = import.meta.env.VITE_PRODUCTION_API;
  }
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded?.role === "admin") {
        navigator("/admin/home");
      } else {
        navigate("/");
      }
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKAPI}/api/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        const decoded = jwtDecode(res.data.token);
        login(decoded.name)
        navigate("/")
        console.log(decoded.name)
      } else {
        setMessage(res.data.message);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className=" flex justify-center items-center min-h-screen bg-gray-100">
        <div className="rounded-2xl shadow p-6 w-80 bg-white">
          <h2 className="text-2xl font-bold mb-4">تسجيل الدخول</h2>
          <p className="text-red-700">{message}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                حساب
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl w-full py-2 px-3 bg-gray-200 focus:bg-gray-100 focus:outline-0"
                type="email"
                placeholder="حساب"
                name="email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                كلمه السر
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-2xl w-full py-2 px-3 bg-gray-200 focus:bg-gray-100 focus:outline-0"
                type="text"
                placeholder="كلمه السر"
                name="password"
                required
              />
            </div>
            <div className="mb-4">
              <button
                className="w-full bg-teal-600 text-white py-2 rounded-full cursor-pointer"
                type="submit"
              >
                تسجيل الدخول
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
