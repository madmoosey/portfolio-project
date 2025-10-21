// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken, refreshToken, logout } from "../auth";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId;

    async function checkAuth() {
      const token = localStorage.getItem("access");
      if (!token) {
        setIsAuthenticated(false);
        navigate("/login");
        setLoading(false);
        return;
      }

      const valid = await verifyToken(token);
      if (valid) {
        setIsAuthenticated(true);
      } else {
        const refreshed = await refreshToken();
        setIsAuthenticated(refreshed);
        if (!refreshed) navigate("/login");
      }
      setLoading(false);
    }

    checkAuth();

    intervalId = setInterval(checkAuth, 5 * 60 * 1000); // refresh every 5 min
    return () => clearInterval(intervalId);
  }, [navigate]);

  return { isAuthenticated, loading, logout };
}