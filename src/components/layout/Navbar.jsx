import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
  Store,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State toggle burger menu mobile

  // Fungsi mendapatkan nama tampilan user
  const getUserDisplayName = () => {
    if (!user) return "Profil";

    if (typeof user.name === "object" && user.name !== null) {
      const fullName =
        `${user.name.firstname || ""} ${user.name.lastname || ""}`.trim();
      return fullName || user.username || "Profil";
    }

    return user.name || user.username || "Profil";
  };

  // Hitung jumlah item di keranjang
  const totalItems = cart
    ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
    : 0;

  // Handler Logout
  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  // Handler klik ikon keranjang
  const handleCartClick = (e) => {
    if (!user) {
      e.preventDefault();
      alert(
        "Silakan login atau daftar akun terlebih dahulu untuk mengakses keranjang!",
      );
      navigate("/login");
    } else {
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand - Shopverse */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 text-xl font-bold text-white hover:opacity-90 transition-opacity"
        >
          <div className="bg-blue-600 text-white p-1.5 rounded-xl shadow-md">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="bg-linear-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent font-extrabold">
            ShopVerse
          </span>
        </Link>

        {/* Bagian Kanan Navbar */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Ikon Keranjang (Tetap Tampil di Dekstop & HP untuk Akses Cepat) */}
          <Link
            to="/cart"
            onClick={handleCartClick}
            className="relative p-2 text-slate-300 hover:text-blue-400 transition-colors"
            title="Keranjang Belanja"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>

          {/* ================= DESKTOP MENU (Tampil dari breakpoint 'md' / >768px) ================= */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                {/* Tombol Khusus Admin */}
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-xl hover:bg-amber-500/20 transition-colors font-semibold"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard Admin
                  </Link>
                )}

                {/* Profil User */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <User className="w-5 h-5 text-slate-400" />
                  <span className="capitalize">{getUserDisplayName()}</span>
                </Link>

                {/* Tombol Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                  title="Keluar"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2">
                <Link to="/login">
                  <Button size="sm" variant="outline" className="px-4">
                    Masuk
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" variant="primary" className="px-4">
                    Daftar Sekarang
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* ================= TOMBOL BURGER (Hanya tampil di layar HP / <768px) ================= */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-200" />
            ) : (
              <Menu className="w-6 h-6 text-slate-200" />
            )}
          </button>
        </div>
      </div>

      {/* ================= DROPDOWN BURGER MENU MOBILE (HP) ================= */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          {user ? (
            /* Menu Saat User Sudah Login */
            <div className="flex flex-col space-y-3">
              <div className="pb-2 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Akun Saya
                </span>
                <span className="text-xs bg-slate-800 text-blue-400 px-2 py-0.5 rounded capitalize">
                  {getUserDisplayName()}
                </span>
              </div>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-sm bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-2 rounded-xl font-semibold hover:bg-amber-500/20 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard Admin
                </Link>
              )}

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-blue-400 py-1.5 transition-colors"
              >
                <User className="w-5 h-5 text-slate-400" />
                <span>Lihat Profil</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 py-1.5 w-full text-left transition-colors cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span>Keluar dari Akun</span>
              </button>
            </div>
          ) : (
            /* Menu Saat User Belum Login */
            <div className="flex flex-col space-y-3 pt-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Akses Akun
              </span>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-center"
                >
                  Masuk
                </Button>
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Button
                  size="sm"
                  variant="primary"
                  className="w-full justify-center"
                >
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
