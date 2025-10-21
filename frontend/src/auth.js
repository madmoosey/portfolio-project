import { API_BASE_URL } from "./config";

// --- 🔧 Utility functions ---

export async function login(email, password) {
  const res = await fetch(`${API_BASE_URL}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  return data;
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.dispatchEvent(new Event("auth-logout")); // notifies all tabs/hooks
}

export function getAccessToken() {
  return localStorage.getItem("access");
}

/**
 * A helper that automatically attaches JWT Authorization header
 * and tries refresh if the token is expired.
 */
export async function apiFetch(endpoint, options = {}) {
  const token = getAccessToken();

  const config = {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  let res = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (res.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      const newToken = getAccessToken();
      config.headers.Authorization = `Bearer ${newToken}`;
      res = await fetch(`${API_BASE_URL}${endpoint}`, config);
    } else {
      logout();
    }
  }

  return res;
}

// --- 🔁 Token helpers ---

export async function verifyToken(token) {
  const res = await fetch(`${API_BASE_URL}/api/token/verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  return res.ok;
}

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return false;

  const res = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("access", data.access);
    return true;
  } else {
    logout();
    return false;
  }
}