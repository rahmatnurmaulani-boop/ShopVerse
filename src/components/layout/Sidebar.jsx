import { useFetch } from "../../hooks/useFetch";

const Sidebar = ({
  selectedCategory,
  onSelectCategory,
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const { data: categories, loading } = useFetch("/products/categories");

  return (
    <aside className="w-full md:w-64 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-6">
      {/* 🏷️ Filter Kategori */}
      <div>
        <h3 className="font-bold text-base mb-3 text-slate-900">Kategori</h3>
        {loading ? (
          <div className="flex flex-col gap-2">
            <div className="skeleton h-8 w-full bg-slate-100 rounded-lg"></div>
            <div className="skeleton h-8 w-full bg-slate-100 rounded-lg"></div>
            <div className="skeleton h-8 w-full bg-slate-100 rounded-lg"></div>
          </div>
        ) : (
          <ul className="flex flex-col gap-1">
            <li>
              <button
                type="button"
                onClick={() => onSelectCategory("")}
                className={`w-full text-left px-3 py-2 rounded-xl capitalize text-sm transition-colors ${
                  selectedCategory === ""
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Semua Produk
              </button>
            </li>
            {categories?.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl capitalize text-sm transition-colors ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr className="border-slate-200" />

      {/* Filter Harga */}
      <div>
        <h3 className="font-bold text-base mb-3 text-slate-900">
          Rentang Harga
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Harga Minimum ($)
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={minPrice}
              onChange={(e) => onPriceChange("min", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Harga Maksimum ($)
            </label>
            <input
              type="number"
              min="0"
              placeholder="1000"
              value={maxPrice}
              onChange={(e) => onPriceChange("max", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
