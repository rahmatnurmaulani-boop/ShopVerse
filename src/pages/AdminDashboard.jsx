import { useState } from "react";
import { Loader } from "lucide-react";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { useProducts } from "../hooks/useProducts";
import UserRow from "../components/admin/UserRow";
import AdminTabHeader from "../components/admin/AdminTabHeader";
import ProductManagementTable from "../components/admin/ProductManagementTable";
import ProductModal from "../components/admin/ProductModal";

const AdminDashboard = () => {
  // Ambil state dan fungsi manajemen pengguna admin
  const {
    registeredUsers,
    loading: loadingUsers,
    deleteUser,
  } = useAdminUsers();

  // Ambil state dan fungsi manajemen produk (CRUD)
  const {
    products,
    loading: loadingProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  // State lokal untuk tab aktif, produk terpilih, dan status modal
  const [activeTab, setActiveTab] = useState("users");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State formulir produk
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "electronics",
    image: "",
    description: "",
  });

  // Membuka modal (mode edit jika menerima data produk, atau mode tambah baru)
  const handleOpenModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.image,
        description: product.description,
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        title: "",
        price: "",
        category: "electronics",
        image: "",
        description: "",
      });
    }
    setIsModalOpen(true);
  };

  // Menyimpan data produk (Create / Update)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || "https://i.pravatar.cc/300",
      description: formData.description,
    };

    if (selectedProduct) {
      const success = await updateProduct(selectedProduct.id, payload);
      if (success) {
        alert("Produk berhasil diperbarui!");
      }
    } else {
      const success = await addProduct(payload);
      if (success) {
        alert("Produk baru berhasil ditambahkan dan disimpan ke Marketplace!");
      }
    }

    setIsModalOpen(false);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?"))
      return;
    await deleteProduct(id);
    alert("Produk berhasil dihapus!");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Navigasi Tab (Users / Products) */}
        <AdminTabHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userCount={registeredUsers.length}
          productCount={products.length}
        />

        {/* Tab Kelola Pengguna */}
        {activeTab === "users" && (
          <div>
            {loadingUsers ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <Loader className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                <p className="text-sm">Memuat seluruh data pengguna...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-800/60 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">
                    <tr>
                      <th className="py-3 px-4">Pengguna</th>
                      <th className="py-3 px-4">Password</th>
                      <th className="py-3 px-4">Kontak</th>
                      <th className="py-3 px-4">TTL / Gender</th>
                      <th className="py-3 px-4">Alamat</th>
                      <th className="py-3 px-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {registeredUsers.map((u, index) => (
                      <UserRow
                        key={u.id || index}
                        user={u}
                        onDelete={deleteUser}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab Kelola Produk */}
        {activeTab === "products" && (
          <ProductManagementTable
            products={products}
            loading={loadingProducts}
            onOpenModal={handleOpenModal}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </div>

      {/* Modal Formulir Tambah/Edit Produk */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveProduct}
        formData={formData}
        setFormData={setFormData}
        isEditMode={!!selectedProduct}
      />
    </div>
  );
};

export default AdminDashboard;
