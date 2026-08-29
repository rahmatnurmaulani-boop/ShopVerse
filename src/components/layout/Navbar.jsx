import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Store } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getUserDisplayName = () => {
    if (!user) return "Profil";

    if (typeof user.name === "object" && user.name !== null) {
      const fullName =
        `${user.name.firstname || ""} ${user.name.lastname || ""}`.trim();
      return fullName || user.username || "Profil";
    }

    return user.name || user.username || "Profil";
  };

  const totalItems = cart
    ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
    : 0;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCartClick = (e) => {
    if (!user) {
      e.preventDefault(); // Mencegah navigasi ke /cart
      alert(
        "Silakan login atau daftar akun terlebih dahulu untuk mengakses keranjang!",
      );
      navigate("/login");
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand - Shopverse */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-white hover:opacity-90 transition-opacity"
        >
          <div className="bg-blue-600 text-white p-1.5 rounded-xl shadow-md">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="bg-linear-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent font-extrabold">
            ShopVerse
          </span>
        </Link>

        {/* Menu & Aksi */}
        <div className="flex items-center gap-4">
          {/* Tombol Keranjang Belanja */}
          <Link
            to="/cart"
            className="relative p-2 text-slate-300 hover:text-blue-400 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Status Login / Pengguna */}
          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              {/* Tombol khusus Admin */}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-xl hover:bg-amber-500/20 transition-colors font-semibold"
                >
                  Dashboard Admin
                </Link>
              )}

              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors"
              >
                <User className="w-5 h-5 text-slate-400" />
                <span className="hidden sm:inline capitalize">
                  {getUserDisplayName()}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                title="Keluar"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
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
      </div>
    </nav>
  );
};

export default Navbar;
