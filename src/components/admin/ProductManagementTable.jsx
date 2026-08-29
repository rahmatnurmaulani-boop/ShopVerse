import { Plus, Pencil, Trash2, Loader } from "lucide-react";

const ProductManagementTable = ({
  products,
  loading,
  onOpenModal,
  onDeleteProduct,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white">Daftar Produk Jualan</h2>
        <button
          onClick={() => onOpenModal()}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg"
        >
          <Plus size={18} />
          Tambah Produk Baru
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <Loader className="w-8 h-8 animate-spin text-blue-500 mb-2" />
          <p className="text-sm">Memuat daftar produk...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800/60 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">
              <tr>
                <th className="py-3 px-4">Produk</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Harga</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-contain bg-white rounded-lg p-1"
                    />
                    <span className="font-medium text-white line-clamp-1 max-w-xs">
                      {item.title}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-blue-400 uppercase font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">
                    ${item.price}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onOpenModal(item)}
                        className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
                        title="Edit Produk"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(item.id)}
                        className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                        title="Hapus Produk"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductManagementTable;
