import React, { useState } from "react";
import logoImgAvif from '../assets/logo.avif'
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { useAuth } from "./contextApi";
const Header = ({fetchProperties}) => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  return (
    <nav className="sticky z-40 top-0 bg-white h-16 flex justify-between items-center px-4">
      <picture>
        <source srcSet={logoImgAvif} type="image/avif" />
        <img
          src="assets/logo.webp"
          alt="Landing"
          loading="eager"
          fetchPriority="high"
          className="w-32 h-32"
        />
      </picture>

      <div
        onClick={() => setOpen(!open)}
        className="flex flex-row-reverse px-3 py-2 ml-1 rounded-full bg-gray-100 justify-center items-center cursor-pointer"
      >
        <IoIosArrowDown className="text-lg mr-1" />
        <VscAccount className="text-2xl" />
      </div>

      <div
        className={`absolute top-[101%] left-1 w-64 bg-white p-4 rounded-xl shadow-lg z-15 overflow-hidden transition-all duration-300 ease-in-out
    ${
      open
        ? "opacity-100 scale-100 max-h-[200px] pointer-events-auto"
        : "opacity-0 scale-95 max-h-0 pointer-events-none"
    }`}
      >
        {token ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">{user}</h2>

            <button
              onClick={() => handleLogout(fetchProperties)}
              className="bg-blue-500 w-full py-2 mb-2 rounded-full text-white cursor-pointer"
            >
              تسجيل الخروج
            </button>

            {window.location.pathname === "/admin/home" ? (
              <Link to="/">
                <button className="bg-blue-500 w-full py-2 mb-2 rounded-full text-white cursor-pointer">
                  الصفحة الاساسية
                </button>
              </Link>
            ) : (
              <Link to="/admin/home">
                <button className="bg-blue-500 w-full py-2 mb-2 rounded-full text-white cursor-pointer">
                  صفحة المشرف
                </button>
              </Link>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">
              تسجيل الدخول
            </h2>
            <Link to="/login">
              <button className="bg-blue-500 w-full py-2 mb-2 rounded-full text-white cursor-pointer">
                تسجيل الدخول
              </button>
            </Link>
            <button className="bg-blue-500 w-full py-2 rounded-full text-white cursor-pointer">
              تسجيل حساب
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
