// src/config.js
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://career-6g0u.onrender.com"
    : "http://localhost:3000";

export default BASE_URL;
