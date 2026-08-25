import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const ProductCard = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!user) {
      alert(
        "Silakan login terlebih dahulu untuk menambahkan barang ke keranjang!",
      );
      navigate("/login");
      return;
    }

    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <figure className="p-4 bg-white h-48 flex items-center justify-center relative">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-36 object-contain hover:scale-105 transition-transform duration-300"
        />
      </figure>

      <div className="p-4 bg-slate-50 flex-1 flex flex-col justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900 text-sm line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-700">
              {product.rating?.rate || 0}
            </span>
            <span className="text-xs text-slate-400">
              ({product.rating?.count || 0})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <span className="text-base font-extrabold text-blue-600">
            ${product.price}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleAddToCart}
              className="p-2! text-blue-600 border-blue-200 hover:bg-blue-100"
              title="Tambah ke Keranjang"
            >
              <ShoppingCart size={14} />
            </Button>
            <Link to={`/product/${product.id}`}>
              <Button size="sm" variant="primary">
                Detail
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
