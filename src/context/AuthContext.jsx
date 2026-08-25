import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (username, password) => {
    if (username === "admin" && password === "admin123") {
      const adminData = {
        id: 999,
        username: "admin",
        role: "admin",
        name: { firstname: "Super", lastname: "Admin" },
        email: "admin@shopverse.com",
      };
      setUser(adminData);
      localStorage.setItem("user", JSON.stringify(adminData));
      return adminData;
    }

    const registeredUsers =
      JSON.parse(localStorage.getItem("registered_users")) || [];
    const foundUser = registeredUsers.find((u) => u.username === username);

    const userData = foundUser || { username, role: "user" };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  };

  const signup = async (userData) => {
    const updatedUser = {
      ...user,
      id: user?.id || Date.now(),
      role: user?.role || "user",
      email: userData.email || user?.email || "",
      username: userData.username || user?.username || "johnd",
      password: userData.password || user?.password || "m338n",
      name: {
        firstname: userData.firstname || user?.name?.firstname || "",
        lastname: userData.lastname || user?.name?.lastname || "",
      },
      address: {
        city: userData.city || user?.address?.city || "",
        street: userData.street || user?.address?.street || "",
        number: Number(userData.number) || user?.address?.number || 0,
        zipcode: userData.zipcode || user?.address?.zipcode || "",
        geolocation: user?.address?.geolocation || { lat: "0", long: "0" },
      },
      phone: userData.phone || user?.phone || "",
      birthDate: userData.birthDate || user?.birthDate || "",
      gender: userData.gender || user?.gender || "",
    };

    try {
      const isExistingUser = Boolean(user?.id);
      const url = isExistingUser
        ? `https://fakestoreapi.com/users/${user.id}`
        : `https://fakestoreapi.com/users`;

      const method = isExistingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const apiResult = await res.json();
      console.log("Fetch API Signup Response:", apiResult);
    } catch (err) {
      console.error("Gagal melakukan fetch ke FakeStoreAPI:", err);
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("registered_users")) || [];
    const userIndex = existingUsers.findIndex(
      (u) =>
        (u.email && u.email === updatedUser.email) ||
        (u.username && u.username === updatedUser.username),
    );

    if (userIndex > -1) {
      existingUsers[userIndex] = {
        ...existingUsers[userIndex],
        ...updatedUser,
      };
    } else {
      existingUsers.push(updatedUser);
    }

    localStorage.setItem("registered_users", JSON.stringify(existingUsers));

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return true;
  };

  const updateProfile = async (updatedData) => {
    const newUserData = {
      ...user,
      ...updatedData,
      name: {
        firstname: updatedData.firstname ?? user?.name?.firstname ?? "",
        lastname: updatedData.lastname ?? user?.name?.lastname ?? "",
      },
      address: {
        ...user?.address,
        street: updatedData.street ?? user?.address?.street ?? "",
        number: updatedData.number ?? user?.address?.number ?? 0,
        city: updatedData.city ?? user?.address?.city ?? "",
      },
    };

    try {
      const userId = user?.id || 1; // Default ID jika user belum memiliki ID dari API
      const res = await fetch(`https://fakestoreapi.com/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      const apiResult = await res.json();
      console.log("Fetch API Update Profile Response:", apiResult);
    } catch (err) {
      console.error("Gagal memperbarui profil ke FakeStoreAPI:", err);
    }

    // 1. Simpan ke State & LocalStorage 'user'
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));

    // 2. Sinkronkan ke daftar 'registered_users' untuk Admin
    const existingUsers =
      JSON.parse(localStorage.getItem("registered_users")) || [];
    const userIndex = existingUsers.findIndex(
      (u) =>
        (u.email && u.email === newUserData.email) ||
        (u.username && u.username === newUserData.username),
    );

    if (userIndex > -1) {
      existingUsers[userIndex] = {
        ...existingUsers[userIndex],
        ...newUserData,
      };
    } else {
      existingUsers.push(newUserData);
    }

    localStorage.setItem("registered_users", JSON.stringify(existingUsers));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("user_profile");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};
