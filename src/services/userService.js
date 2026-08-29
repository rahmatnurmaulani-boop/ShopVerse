// URL dasar endpoint API FakeStore untuk data pengguna
const BASE_URL = "https://fakestoreapi.com/users";

// Mengambil profil pengguna (mengutamakan localStorage, lalu API FakeStore)
export const getUserProfile = async (authUser) => {
  // 1. Cek profil tersimpan di localStorage
  const savedProfile = localStorage.getItem("user_profile");

  if (savedProfile) {
    const parsed = JSON.parse(savedProfile);
    if (parsed.username === (authUser?.username || authUser?.name)) {
      return parsed;
    }
  }

  try {
    // 2. Jika tidak ada di lokal, fetch data pengguna dari API
    const activeUsername = authUser?.username || authUser?.name || "mor_2314";
    const response = await fetch(BASE_URL);
    const users = await response.json();

    // 3. Cari pengguna yang sesuai dengan username yang aktif
    const currentUser =
      users.find(
        (u) => u.username.toLowerCase() === activeUsername.toLowerCase(),
      ) || users[0];

    // 4. Susun struktur data profil lengkap
    const profileData = {
      id: currentUser.id,
      username: activeUsername,
      fullName:
        `${currentUser.name.firstname} ${currentUser.name.lastname}`.toUpperCase(),
      email: currentUser.email,
      phone: currentUser.phone || "081234567890",
      gender: "laki-laki",
      birthDate: "1998-05-15",
      address: currentUser.address
        ? `${currentUser.address.street} No. ${currentUser.address.number}, ${currentUser.address.city}`
        : "Jl. Sudirman No. 123, Jakarta",
    };

    // Simpan ke localStorage untuk penggunaan berikutnya
    localStorage.setItem("user_profile", JSON.stringify(profileData));
    return profileData;
  } catch (error) {
    // 5. Fallback jika jaringan/API mengalami error
    console.error("Gagal mengambil data user:", error);
    const fallbackName = authUser?.username || authUser?.name || "User";
    return {
      username: fallbackName,
      fullName: fallbackName.toUpperCase(),
      email: `${fallbackName.toLowerCase()}@example.com`,
      phone: "081234567890",
      gender: "laki-laki",
      birthDate: "1998-05-15",
      address: "Alamat belum diatur",
    };
  }
};

// Memperbarui profil pengguna (PUT ke API & simpan ke localStorage)
export const updateUserProfile = async (userId, formData) => {
  // Kirim permintaan PUT ke API FakeStore
  await fetch(`${BASE_URL}/${userId || 1}`, {
    method: "PUT",
    body: JSON.stringify({
      email: formData.email,
      username: formData.fullName,
      phone: formData.phone,
    }),
  });

  // Perbarui simpanan data di localStorage
  localStorage.setItem("user_profile", JSON.stringify(formData));
};
