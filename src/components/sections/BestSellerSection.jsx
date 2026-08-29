import { Link } from "react-router-dom";
import { Flame, Eye, ShoppingCart } from "lucide-react";
import Button from "../ui/Button";

const BestSellerSection = ({
  products = [],
  loading,
  selectedCategory,
  searchQuery,
  ratingThreshold,
  limit,
  onAddToCart,
  onSelectProduct,
}) => {
  // Filter produk Best Seller
  const bestSellers = (products || [])
    .filter((p) => p.rating?.rate >= ratingThreshold)
    .slice(0, limit);

  if (
    loading ||
    selectedCategory ||
    searchQuery !== "" ||
    bestSellers.length === 0
  ) {
    return null;
  }

  return (
    <section className="mb-12 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-6">
        <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
        <h2 className="text-2xl font-bold text-white">Best Sellers</h2>

        <div
          className="tooltip tooltip-right"
          data-tip="Produk dengan Rating Terbanyak"
        >
          <span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium text-xs gap-2 py-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Top Rated
          </span>
        </div>
      </div>

      {/* Grid Card Produk 3D */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {bestSellers.map((item) => (
          <div key={item.id} className="hover-3d cursor-pointer w-full">
            {/* Main 3D Card Content */}
            <div className="card w-full bg-white text-slate-900 border border-slate-200 rounded-2xl overflow-hidden bg-[radial-gradient(circle_at_bottom_left,#00000008_35%,transparent_36%),radial-gradient(circle_at_top_right,#00000008_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
              <figure className="p-4 bg-white h-44 flex items-center justify-center relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-36 object-contain hover:scale-105 transition-transform duration-300"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectProduct(item);
                    document.getElementById("quick_view_modal").showModal();
                  }}
                  className="btn btn-xs btn-circle bg-white text-slate-700 border border-slate-200 shadow-sm absolute top-2 right-2 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Eye size={14} />
                </button>
              </figure>

              <div className="card-body p-4 bg-slate-50/80 justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-amber-500 font-bold">
                      ★ {item.rating?.rate}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({item.rating?.count})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-base font-bold text-blue-600">
                    ${item.price}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        onAddToCart(item);
                      }}
                      className="p-1.5! text-blue-600 border-blue-200 hover:bg-blue-100"
                    >
                      <ShoppingCart size={14} />
                    </Button>
                    <Link to={`/product/${item.id}`}>
                      <Button size="sm" variant="primary">
                        Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellerSection;
