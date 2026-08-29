import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, User } from "lucide-react";
import Button from "../components/ui/Button";

const Login = () => {
  // State form login (dengan nilai bawaan testing FakeStore API)
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  // Handler eksekusi submit form login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Login gagal! Periksa username dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Header Kartu Login */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Masuk ke akun Shopverse kamu</p>
        </div>

        {/* Alert jika terjadi kegagalan autentikasi */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6">
            <span>{error}</span>
          </div>
        )}

        {/* Form Isian Kredensial Pengguna */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <User
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Tombol Akses Masuk */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth={true}
              disabled={loading}
              className="py-3"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>

        {/* Link Navigasi ke Halaman Pendaftaran */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Belum punya akun?{" "}
          <Link
            to="/signup"
            className="text-blue-400 font-semibold hover:underline"
          >
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
