import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";
import Toast from "../components/ui/Toast";
import Button from "../components/ui/Button";
import { TOAST_DURATION } from "../constants/config";

const ProductDetail = () => {
  const { id } = useParams(); // Ambil parameter ID produk dari URL
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading } = useProducts();

  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  // Pencarian produk dari gabungan data API & localStorage berdasarkan ID
  const product = (products || []).find((p) => String(p.id) === String(id));

  // Handler penambahan barang ke keranjang beserta penanganan notifikasi toast
  const handleAddToCart = () => {
    if (!product) return;

    const success = addToCart(product, quantity);

    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), TOAST_DURATION);
    } else {
      navigate("/login");
    }
  };

  // Status tampilan loading dan fallback jika produk tidak ada
  if (loading) return <div className="p-8 text-center">Memuat produk...</div>;
  if (!product)
    return (
      <div className="p-8 text-center text-red-500">
        Produk tidak ditemukan.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Notifikasi Toast saat produk berhasil masuk keranjang */}
      {showToast && (
        <Toast
          message={`${quantity} produk berhasil ditambahkan ke keranjang!`}
        />
      )}

      {/* Tombol Navigasi Kembali */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 gap-2 text-slate-600"
      >
        <ArrowLeft size={18} /> Kembali
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        {/* Visualisasi Gambar Produk */}
        <div className="flex items-center justify-center p-6 bg-white rounded-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain"
          />
        </div>

        {/* Detail Informasi dan Kontrol Transaksi Produk */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="badge bg-blue-50 text-blue-600 border border-blue-200 uppercase font-semibold text-xs px-3 py-1 mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
              {product.title}
            </h1>
            <p className="text-2xl font-black text-blue-600 mb-4">
              ${product.price}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-100">
            {/* Pengatur Kuantitas Pembelian */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-700">
                Jumlah:
              </span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Tombol Eksekusi Keranjang */}
            <Button
              variant="primary"
              size="lg"
              fullWidth={true}
              onClick={handleAddToCart}
              className="gap-2"
            >
              <ShoppingCart size={18} />
              Tambah ke Keranjang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
