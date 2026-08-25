import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useSignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Semua bidang harus diisi!");
      return;
    }

    setLoading(true);

    try {
      const nameParts = formData.name.trim().split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      const payload = {
        username: formData.email.split("@")[0] || "user",
        email: formData.email,
        password: formData.password,
        firstname,
        lastname,
      };

      const success = await signup(payload);
      if (success) {
        navigate("/profile");
      }
    } catch (err) {
      setError("Gagal membuat akun. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, error, handleChange, handleSubmit };
};
