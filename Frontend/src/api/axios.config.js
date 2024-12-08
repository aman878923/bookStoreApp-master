import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://bookstoreapp-master.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const fetchCSRFToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/csrf-token`, {
      withCredentials: true,
    });
    return response.data.csrfToken;
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
    throw error;
  }
};
// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (!config.headers["X-CSRF-Token"]) {
      config.headers["X-CSRF-Token"] = await fetchCSRFToken();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && error.response?.data?.message === "Invalid CSRF token" && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers["X-CSRF-Token"] = token;
          return api(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        fetchCSRFToken()
          .then(token => {
            api.defaults.headers["X-CSRF-Token"] = token;
            originalRequest.headers["X-CSRF-Token"] = token;
            processQueue(null, token);
            resolve(api(originalRequest));
          })
          .catch(err => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
