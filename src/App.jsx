import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Impor komponen/halaman (pastikan path file sesuai dengan struktur folder Anda)
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/SignUp";
import ProductDetail from "./pages/ProductDetail";

const UserProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 🛡️ Komponen Proteksi Rute Khusus Admin
const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Jika user belum login ATAU role bukan admin, arahkan ke halaman utama
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-slate-900">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* 🔒 RUTE ADMIN DIPROTEKSI */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          {/* Menangani URL yang tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
