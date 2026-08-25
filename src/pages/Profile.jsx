import React from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit3,
  Save,
  X,
  Key,
} from "lucide-react";
import { useProfileForm } from "../hooks/useProfileForm";
import ProfileField from "../components/profile/ProfileField";

const Profile = () => {
  const {
    user,
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    handleSubmit,
  } = useProfileForm();

  if (!user) {
    return (
      <div className="text-center py-20 text-slate-400">
        Silakan login terlebih dahulu untuk melihat profil.
      </div>
    );
  }

  const genderOptions = [
    { value: "", label: "Pilih Gender" },
    { value: "Laki-laki", label: "Laki-laki" },
    { value: "Perempuan", label: "Perempuan" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Header Profil */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-2xl">
              <User size={36} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white capitalize">
                {user.name?.firstname
                  ? `${user.name.firstname} ${user.name.lastname || ""}`
                  : user.username}
              </h1>
              <p className="text-slate-400 text-sm">@{user.username}</p>
            </div>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              <Edit3 size={16} /> Edit Profil
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              <X size={16} /> Batal
            </button>
          )}
        </div>

        {/* Form Detail Data Profil */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField
              label="Nama Depan"
              name="firstname"
              value={formData.firstname}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <ProfileField
              label="Nama Belakang"
              name="lastname"
              value={formData.lastname}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <ProfileField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              isEditing={isEditing}
              onChange={handleChange}
              icon={Mail}
            />
            <ProfileField
              label="No. Telepon"
              name="phone"
              value={formData.phone}
              isEditing={isEditing}
              onChange={handleChange}
              icon={Phone}
            />
            <ProfileField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              isEditing={isEditing}
              onChange={handleChange}
              icon={Key}
            />
            <ProfileField
              label="Gender"
              name="gender"
              value={formData.gender}
              isEditing={isEditing}
              onChange={handleChange}
              icon={Calendar}
              options={genderOptions}
            />
            <ProfileField
              label="Jalan"
              name="street"
              value={formData.street}
              isEditing={isEditing}
              onChange={handleChange}
              icon={MapPin}
            />
            <ProfileField
              label="Kota"
              name="city"
              value={formData.city}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>

          {/* Tombol Simpan */}
          {isEditing && (
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-emerald-900/20"
              >
                <Save size={16} /> Simpan Perubahan
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
