import axios from "axios";

// Determine the base API URL (Fallback to localhost on backend port 5000 if not set)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// We can intercept requests to attach headers manually if needed,
// though AuthContext already adds the default Bearer token on login.

export default api;
