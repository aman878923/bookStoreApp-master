import axios from "axios";

const api = axios.create({
  baseURL: "https://bookstoreapp-master.onrender.com", //  your backend URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  // Add this line
});
// Add this before response interceptor
api.interceptors.request.use(async (config) => {
  if (!config.headers["X-CSRF-Token"]) {
    const response = await axios.get(
      "https://bookstoreapp-master.onrender.com/api/csrf-token",
      {
        withCredentials: true,
      }
    );
    config.headers["X-CSRF-Token"] = response.data.csrfToken;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
