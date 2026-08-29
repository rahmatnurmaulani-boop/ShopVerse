import { useState, useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const localProducts =
        JSON.parse(localStorage.getItem("admin_products")) || [];

      const res = await fetch("https://fakestoreapi.com/products");
      const apiProducts = await res.json();

      setProducts([...localProducts, ...apiProducts]);
    } catch (err) {
      console.error("Gagal memuat produk:", err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (newProductData) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProductData),
      });
      const data = await res.json();

      const createdProduct = {
        ...newProductData,
        id: data.id || Date.now(),
      };

      const existingLocal =
        JSON.parse(localStorage.getItem("admin_products")) || [];
      const updatedLocal = [createdProduct, ...existingLocal];
      localStorage.setItem("admin_products", JSON.stringify(updatedLocal));

      setProducts((prev) => [createdProduct, ...prev]);
      return true;
    } catch (err) {
      console.error("Gagal menambah produk:", err);
      return false;
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const existingLocal =
        JSON.parse(localStorage.getItem("admin_products")) || [];
      const updatedLocal = existingLocal.map((p) =>
        String(p.id) === String(id) ? { ...p, ...updatedData } : p,
      );
      localStorage.setItem("admin_products", JSON.stringify(updatedLocal));

      setProducts((prev) =>
        prev.map((p) =>
          String(p.id) === String(id) ? { ...p, ...updatedData } : p,
        ),
      );
      return true;
    } catch (err) {
      console.error("Gagal memperbarui produk:", err);
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      const existingLocal =
        JSON.parse(localStorage.getItem("admin_products")) || [];
      const updatedLocal = existingLocal.filter(
        (p) => String(p.id) !== String(id),
      );
      localStorage.setItem("admin_products", JSON.stringify(updatedLocal));

      setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (err) {
      console.error("Gagal menghapus produk:", err);
    }
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: loadProducts,
  };
};
