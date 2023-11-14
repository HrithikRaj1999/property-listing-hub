import axios from "axios"; // Import the Axios library

// Create an Axios instance with a base URL
const api = axios.create({
  // baseURL: "http://localhost:5000/api/", // Set your base URL here
  baseURL: "https://propertylisting-hub.onrender.com/api/", // Set your base URL here
});
export default api;
