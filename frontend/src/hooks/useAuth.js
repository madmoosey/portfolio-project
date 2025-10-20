import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        // Check with backend session or token endpoint
        const res = await fetch(`${API_BASE_URL}/api/auth/user/`, {
          credentials: "include", // allows Django session cookies
        });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error checking auth:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  return { isAuthenticated, loading };
}