import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../auth";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-black/80 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide text-white hover:text-gray-300 transition"
      >
        gallerie
      </Link>

      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <Link
              to="/"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              My Media
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
    </nav>
  );
}