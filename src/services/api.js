import axios from "axios";

// Membuat instance Axios dengan konfigurasi dasar API
const api = axios.create({
  baseURL: "https://fakestoreapi.com", 
  headers: {
    "Content-Type": "application/json", 
  },
});

export default api;
