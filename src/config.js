// src/config.js
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://career-z6lb.onrender.com"
    : "http://localhost:3000";

export default BASE_URL;
