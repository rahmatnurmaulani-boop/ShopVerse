const BASE_URL = "https://fakestoreapi.com/users";

export const getUserProfile = async (authUser) => {
  const savedProfile = localStorage.getItem("user_profile");

  if (savedProfile) {
    const parsed = JSON.parse(savedProfile);
    if (parsed.username === (authUser?.username || authUser?.name)) {
      return parsed;
    }
  }

  try {
    const activeUsername = authUser?.username || authUser?.name || "mor_2314";
    const response = await fetch(BASE_URL);
    const users = await response.json();

    const currentUser =
      users.find(
        (u) => u.username.toLowerCase() === activeUsername.toLowerCase(),
      ) || users[0];

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

    localStorage.setItem("user_profile", JSON.stringify(profileData));
    return profileData;
  } catch (error) {
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

export const updateUserProfile = async (userId, formData) => {
  await fetch(`${BASE_URL}/${userId || 1}`, {
    method: "PUT",
    body: JSON.stringify({
      email: formData.email,
      username: formData.fullName,
      phone: formData.phone,
    }),
  });
  localStorage.setItem("user_profile", JSON.stringify(formData));
};
