import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./index.css";

const isRootDeployment =
  window.location.hostname.includes("vercel.app") ||
  window.location.hostname.includes("netlify.app");

// Jika di GitHub Pages, gunakan '/ShopVerse', jika di Vercel/Netlify gunakan '/'
const basename = isRootDeployment ? "/" : "/ShopVerse";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
