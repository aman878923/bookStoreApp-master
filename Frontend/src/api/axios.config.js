import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://bookstoreapp-master.onrender.com";
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Add token to request headers
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Add CSRF token to request headers
    if (!config.headers["X-CSRF-Token"]) {
      try {
        const response = await axios.get(`${BASE_URL}/api/csrf-token`, {
          withCredentials: true,
        });
        config.headers["X-CSRF-Token"] = response.data.csrfToken;
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
