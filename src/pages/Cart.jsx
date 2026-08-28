import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";

const Cart = () => {
  const { cart = [], removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = (cart || []).reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const handleDecrement = (item) => {
    const currentQty = item.quantity || 1;
    updateQuantity(item.id, currentQty - 1);
  };

  const handleIncrement = (item) => {
    const currentQty = item.quantity || 1;
    updateQuantity(item.id, currentQty + 1);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-slate-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Keranjang Belanja Kosong
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Sepertinya Anda belum menambahkan produk apapun ke keranjang.
        </p>
        <Link to="/">
          <Button variant="primary" className="gap-2">
            <ArrowLeft size={18} />
            Mulai Belanja
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">
        Keranjang Belanja
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain p-2 bg-white rounded-xl"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 text-sm line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-blue-600 font-bold text-sm mt-1">
                  ${item.price}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => handleDecrement(item)}
                  className="p-1 hover:bg-white rounded-lg transition-colors text-slate-600"
                  title="Kurangi"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-bold text-slate-800 px-2 min-w-5 text-center">
                  {item.quantity || 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleIncrement(item)}
                  className="p-1 hover:bg-white rounded-lg transition-colors text-slate-600"
                  title="Tambah"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart && removeFromCart(item.id)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Hapus"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => clearCart && clearCart()}
            className="text-xs text-red-500 hover:underline font-semibold mt-2"
          >
            Kosongkan Keranjang
          </button>
        </div>

        <div className="bg-white border border-slate-200 text-slate-900 rounded-2xl p-6 h-fit space-y-4 shadow-lg">
          <h2 className="text-lg font-bold border-b border-slate-100 pb-3 text-slate-900">
            Ringkasan Pesanan
          </h2>

          <div className="flex justify-between text-slate-600 text-sm">
            <span>Total Barang</span>
            <span className="text-slate-900 font-semibold">
              {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} items
            </span>
          </div>

          <div className="flex justify-between text-slate-600 text-sm border-t border-slate-100 pt-3">
            <span>Total Harga</span>
            <span className="text-xl font-extrabold text-blue-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <Button variant="primary" fullWidth={true} className="mt-4">
            Lanjut ke Pembayaran
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
