import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: apiKey,
});

// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized error:", error);
      // Optionally: Redirect to login page or refresh token if needed
      // For example:
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
