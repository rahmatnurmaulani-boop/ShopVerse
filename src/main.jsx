import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Targetkan root HTML dan jalankan React 18
ReactDOM.createRoot(document.getElementById("root")).render(
  // Pengecekan bug tambahan saat mode dev
  <React.StrictMode>
    {/* Aktifkan sistem routing URL browser */}
    <BrowserRouter basename="/ShopVerse">
      {/* Sediakan data autentikasi user ke seluruh komponen */}
      <AuthProvider>
        {/* Sediakan data & fungsi keranjang belanja */}
        <CartProvider>
          {/* Komponen utama aplikasi */}
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
