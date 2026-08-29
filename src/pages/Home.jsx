import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import ProductCard from "../components/sections/ProductCard";
import QuickViewModal from "../components/sections/QuickViewModal";
import Toast from "../components/ui/Toast";
import Carousel from "../components/sections/Carousel";
import BestSellerSection from "../components/sections/BestSellerSection";
import { useCart } from "../context/CartContext";
import {
  ITEMS_PER_PAGE,
  BEST_SELLER_RATING_THRESHOLD,
  BEST_SELLER_LIMIT,
  TOAST_DURATION,
} from "../constants/config";
import { useProducts } from "../hooks/useProducts";

const Home = () => {
  // State filter, pencarian, paginasi, modal, dan toast
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Ambil data produk dan fungsi keranjang
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Handler ubah filter harga
  const handlePriceChange = (type, value) => {
    if (type === "min") setMinPrice(value);
    if (type === "max") setMaxPrice(value);
    setCurrentPage(1);
  };

  // Menyaring data produk berdasarkan kategori, kata kunci, dan rentang harga
  const filteredProducts = (products || []).filter((p) => {
    const matchesCategory = selectedCategory
      ? p.category === selectedCategory
      : true;

    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const price = p.price;
    const min = minPrice !== "" ? parseFloat(minPrice) : 0;
    const max = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
    const matchesPrice = price >= min && price <= max;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Kalkulasi paginasi halaman
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Handler tambah barang ke keranjang
  const handleAddToCart = (product) => {
    if (addToCart(product)) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), TOAST_DURATION);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 relative">
      {/* Toast notifikasi */}
      {showToast && (
        <Toast message="Produk berhasil ditambahkan ke keranjang!" />
      )}

      {/* Spanduk Carousel Promosi */}
      <Carousel />

      {/* Seksi Produk Terlaris (Best Seller) */}
      <BestSellerSection
        products={products}
        loading={loading}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        ratingThreshold={BEST_SELLER_RATING_THRESHOLD}
        limit={BEST_SELLER_LIMIT}
        onAddToCart={handleAddToCart}
        onSelectProduct={setSelectedProduct}
      />

      {/* Konten Utama (Sidebar Filter + Grid Produk) */}
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />

        <main className="flex-1">
          {/* Skeleton Loader saat data dimuat */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton h-64 w-full bg-slate-200 rounded-2xl"
                ></div>
              ))}
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="alert bg-blue-50 text-blue-700 border border-blue-200">
              <span>
                Tidak ada produk yang cocok dengan pencarian atau rentang harga
                Anda.
              </span>
            </div>
          ) : (
            <>
              {/* Grid Daftar Kartu Produk */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {/* Tombol Navigasi Paginasi Halaman */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <div className="join border border-gray-200 rounded-xl overflow-hidden">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`join-item btn btn-md ${
                            currentPage === page
                              ? "bg-slate-900 text-white hover:bg-slate-800 border-none"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Modal Peninjauan Cepat (Quick View) */}
      <QuickViewModal product={selectedProduct} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default Home;
