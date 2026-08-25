import { Shield, Loader } from "lucide-react";
import { useAdminUsers } from "../hooks/useAdminUsers";
import UserRow from "../components/admin/UserRow";

const AdminDashboard = () => {
  const { registeredUsers, loading, deleteUser } = useAdminUsers();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-2xl">
              <Shield size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Panel Admin - Pemantauan User
              </h1>
              <p className="text-slate-400 text-sm">
                Total Seluruh Pengguna:{" "}
                <span className="text-blue-400 font-bold">
                  {loading ? "..." : registeredUsers.length}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* State Loading / Empty / Data */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Loader className="w-8 h-8 animate-spin text-blue-500 mb-2" />
            <p className="text-sm">Memuat seluruh data pengguna...</p>
          </div>
        ) : registeredUsers.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            Belum ada data pengguna yang ditemukan.
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
                  <UserRow key={u.id || index} user={u} onDelete={deleteUser} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
