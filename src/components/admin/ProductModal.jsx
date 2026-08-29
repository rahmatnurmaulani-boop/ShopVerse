import { X, Check } from "lucide-react";

const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Produk" : "Tambah Produk Baru"}
        </h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Harga ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="electronics">electronics</option>
                <option value="jewelery">jewelery</option>
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">
              URL Gambar
            </label>
            <input
              type="url"
              placeholder="https://fakestoreapi.com/img/..."
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">
              Deskripsi
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Check size={16} />
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
