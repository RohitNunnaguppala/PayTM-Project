import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDarkMode } from "../hooks/useDarkMode";
import { Moon, Sun, User2 } from "lucide-react";
import Logo from "../assets/paytm-logo.png";

export const Appbar = () => {
  const [user, setUser] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isDark, setIsDark] = useDarkMode();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUser(response.data.firstName || response.data.username || "User");
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md transition-colors duration-300">
      {/* Logo + Brand */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="PayTM" className="h-10 w-auto sm:h-12" />
      </div>

      <div className="flex items-center gap-4">
        {/* 🌗 Dark Mode Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle dark mode"
          className="text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white transition"
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* 👤 Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="User menu"
            className="w-10 h-10 rounded-full bg-[#00b9f5] text-white flex items-center justify-center font-bold shadow hover:bg-[#009edb] transition"
          >
            {user ? user[0].toUpperCase() : <User2 size={18} />}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 animate-fade-in">
              <div className="px-4 py-2 border-b text-sm font-medium text-gray-700 dark:text-gray-200">
                {user}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-xl transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
