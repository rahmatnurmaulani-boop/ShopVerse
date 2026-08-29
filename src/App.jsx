import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/SignUp";
import ProductDetail from "./pages/ProductDetail";

// Proteksi akses rute khusus user yang sudah login
const UserProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Proteksi akses rute khusus akun bertipe admin
const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    // Layout utama aplikasi (Header, Konten, Footer)
    <div className="min-h-screen flex flex-col justify-between bg-white text-slate-900">
      <Navbar />
      <main>
        {/* Definisi rute navigasi halaman */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Rute rahasia dashboard admin yang dilindungi */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          {/* Redirect otomatis ke Home jika URL salah/tidak ada */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
