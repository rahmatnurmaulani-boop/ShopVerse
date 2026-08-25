import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Mail, Phone, MapPin, Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Footer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProtectedRoute = (e, path) => {
    e.preventDefault();
    if (!user) {
      alert("Silakan login terlebih dahulu untuk mengakses halaman ini!");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-white font-bold text-xl"
            >
              <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md">
                <ShoppingCart size={20} />
              </div>
              <span className="bg-linear-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent font-extrabold">
                ShopVerse
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Platform e-commerce terpercaya untuk semua kebutuhan fashion,
              elektronik, dan gaya hidup Anda. Belanja makin mudah dan aman.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Navigasi
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                {/* 🔒 Proteksi Navigasi Keranjang */}
                <a
                  href="/cart"
                  onClick={(e) => handleProtectedRoute(e, "/cart")}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Keranjang Belanja
                </a>
              </li>
              <li>
                {/* 🔒 Proteksi Navigasi Akun Saya */}
                <a
                  href="/profile"
                  onClick={(e) => handleProtectedRoute(e, "/profile")}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Akun Saya
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Pelanggan */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Bantuan
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-blue-400 cursor-pointer transition-colors">
                Pusat Bantuan
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">
                Syarat & Ketentuan
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">
                Kebijakan Privasi
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">
                Pengembalian Barang
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-blue-400 shrink-0" />
                <span>Jl. Sudirman No. 123, Jakarta</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-400 shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400 shrink-0" />
                <span>support@shopverse.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ShopVerse. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan{" "}
            <Heart size={14} className="text-red-500 fill-red-500" /> untuk
            pengalaman belanja terbaik.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
