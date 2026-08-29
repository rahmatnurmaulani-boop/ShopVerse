import { Shield, Users, Package } from "lucide-react";

const AdminTabHeader = ({
  activeTab,
  setActiveTab,
  userCount,
  productCount,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-2xl">
          <Shield size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">
            Panel Dashboard Admin
          </h1>
          <p className="text-slate-400 text-sm">
            Kelola pengguna terdaftar dan katalog barang penjualan
          </p>
        </div>
      </div>

      <div className="flex bg-slate-800/80 p-1 rounded-2xl border border-slate-700/50">
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "users"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Users size={16} />
          Pengguna ({userCount})
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "products"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Package size={16} />
          Produk ({productCount})
        </button>
      </div>
    </div>
  );
};

export default AdminTabHeader;
