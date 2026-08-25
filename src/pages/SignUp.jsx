import { Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import Button from "../components/ui/Button";
import InputWithIcon from "../components/ui/InputWithIcon";
import { useSignUpForm } from "../hooks/useSignUpForm";

const SignUp = () => {
  const { formData, loading, error, handleChange, handleSubmit } =
    useSignUpForm();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-600/10 text-blue-400 rounded-2xl mb-3 border border-blue-500/20">
            <UserPlus size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white">Buat Akun Baru</h2>
          <p className="text-slate-400 text-sm mt-1">
            Daftar untuk mulai berbelanja di Shopverse
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputWithIcon
            label="Nama Lengkap"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            icon={User}
            required
          />

          <InputWithIcon
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nama@email.com"
            icon={Mail}
            required
          />

          <InputWithIcon
            label="Kata Sandi"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            icon={Lock}
            required
          />

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
                "Daftar Sekarang"
              )}
            </Button>
          </div>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Sudah memiliki akun?{" "}
          <Link
            to="/login"
            className="text-blue-400 font-semibold hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
