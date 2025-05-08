import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoImgAvif from "../assets/logo.avif";

// Icon imports as requested
import FacebookIcon from "lucide-react/dist/esm/icons/facebook";
import InstagramIcon from "lucide-react/dist/esm/icons/instagram";
import LinkedinIcon from "lucide-react/dist/esm/icons/linkedin";
import ChevronDownIcon from "lucide-react/dist/esm/icons/chevron-down";
import UserRoundIcon from "lucide-react/dist/esm/icons/user-round";
// Import WhatsApp icon from react-icons
import { FaWhatsapp } from "react-icons/fa"; 

import { useAuth } from "./contextApi";

const Header = ({ fetchProperties }) => {
  const token = localStorage.getItem("token");
  const { user, handleLogout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAdminPage = window.location.pathname === "/admin/home";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky z-40 top-0 bg-white h-16 flex justify-between items-center px-4 shadow">
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
        className="flex flex-row-reverse px-3 py-2 ml-1 rounded-full bg-gray-100 justify-center items-center cursor-pointer hover:bg-gray-200 transition"
      >
        <ChevronDownIcon className="text-lg mr-0.5" />
        <UserRoundIcon className="text-2xl" />
      </div>

      <div
        ref={dropdownRef}
        className={`absolute top-[101%] left-1 w-64 sm:w-72 bg-white p-4 rounded-xl shadow-lg z-50 transition-all duration-100 ease-in-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        {token ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">{user}</h2>

            <button
              onClick={() => handleLogout(fetchProperties)}
              className="bg-[var(--bg-main)] w-full py-2 mb-2 rounded-full text-white cursor-pointer hover:bg-[#375963] transition"
            >
              تسجيل الخروج
            </button>

            {isAdminPage ? (
              <Link to="/">
                <button className="bg-[var(--bg-main)] w-full py-2 mb-2 rounded-full text-white cursor-pointer hover:bg-[#375963] transition">
                  الصفحة الاساسية
                </button>
              </Link>
            ) : (
              <Link to="/admin/home">
                <button className="bg-[var(--bg-main)] w-full py-2 mb-2 rounded-full text-white cursor-pointer hover:bg-[#375963] transition">
                  صفحة المشرف
                </button>
              </Link>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">
              تواصل معنا مباشرة
            </h2>
            <Link to="/contact">
              <button className="bg-[var(--bg-main)] w-full py-2 mb-2 rounded-full text-white cursor-pointer hover:bg-[#375963] transition">
                تواصل معنا
              </button>
            </Link>
          </>
        )}

        <div className="flex justify-evenly items-center mt-4 pt-4 border-t">
          <a
            href="https://facebook.com/YOUR_PAGE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FacebookIcon className="text-blue-600 hover:scale-110 hover:text-blue-700 transition-all cursor-pointer" />
          </a>
          <a
            href="https://instagram.com/YOUR_PAGE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon className="text-pink-500 hover:scale-110 hover:text-pink-600 transition-all cursor-pointer" />
          </a>
          <a
            href="https://linkedin.com/YOUR_PAGE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="text-blue-800 hover:scale-110 hover:text-blue-900 transition-all cursor-pointer" />
          </a>
          <a
            href="https://wa.me/201234567890"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="text-green-500 h-7 w-7 hover:scale-110 hover:text-green-600 transition-all cursor-pointer" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
