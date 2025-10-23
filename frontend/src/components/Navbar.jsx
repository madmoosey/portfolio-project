import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../auth";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-black/80 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      {/* Logo / Brand */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide text-white hover:text-gray-300 transition"
      >
        gallerie
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        {isAuthenticated ? (
          <>
            <Link
              to="/"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              my gallerie
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="md:hidden text-white focus:outline-none"
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full bg-black border-t border-gray-800 flex flex-col items-center space-y-4 py-6 md:hidden"
          >
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg text-gray-300 hover:text-white transition"
                >
                  My Media
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}