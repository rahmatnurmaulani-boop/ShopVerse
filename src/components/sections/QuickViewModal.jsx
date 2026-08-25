import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const QuickViewModal = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = () => {
    const modal = document.getElementById("quick_view_modal");
    if (modal) modal.close();

    const success = onAddToCart(product);
    if (!success) {
      navigate("/login");
    }
  };

  return (
    <dialog
      id="quick_view_modal"
      className="modal modal-bottom sm:modal-middle backdrop-blur-xs"
    >
      <div className="modal-box bg-slate-900 text-slate-100 border border-slate-800 rounded-3xl shadow-2xl">
        <div>
          {/* Container Gambar Produk */}
          <div className="flex justify-center p-6 bg-white rounded-2xl mb-4">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-52 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Badge Kategori */}
          <span className="badge bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs capitalize mb-2 font-medium">
            {product.category}
          </span>

          {/* Judul & Deskripsi */}
          <h3 className="font-bold text-lg text-white mb-2">{product.title}</h3>
          <p className="py-2 text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {product.description}
          </p>

          {/* Harga & Action Button */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
            <span className="text-2xl font-bold text-blue-400">
              ${product.price}
            </span>
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none gap-2 px-4 rounded-xl shadow-lg transition-all"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>

        {/* Modal Action - Tombol Tutup */}
        <div className="modal-action mt-6 border-t border-slate-800/60 pt-3">
          <form method="dialog">
            <button className="btn btn-sm btn-ghost text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
              Tutup
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default QuickViewModal;
