import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/", // change to your backend URL
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh tokens if expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        if (refresh) {
          const { data } = await axios.post("http://localhost:8000/api/token/refresh/", {
            refresh,
          });

          localStorage.setItem("access", data.access);
          api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
          return api(originalRequest);
        }
      } catch (err) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
