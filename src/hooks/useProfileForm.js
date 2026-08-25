import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const useProfileForm = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    street: "",
    number: "",
    city: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.name?.firstname || "",
        lastname: user.name?.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
        birthDate: user.birthDate || "",
        gender: user.gender || "",
        street: user.address?.street || "",
        number: user.address?.number || "",
        city: user.address?.city || "",
        password: user.password || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return {
    user,
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    handleSubmit,
  };
};
