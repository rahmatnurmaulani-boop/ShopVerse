import { useState, useEffect } from "react";

export const useAdminUsers = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLocalUsers = () => {
    try {
      const data = localStorage.getItem("registered_users");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Gagal parse localStorage registered_users:", err);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const localUsers = getLocalUsers();
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/users");
        if (!res.ok) throw new Error("Gagal mengambil data dari API");
        const apiUsers = await res.json();

        const normalizedApiUsers = apiUsers.map((u) => ({
          ...u,
          id: u.id || `api-${u.username}`,
          firstname: u.name?.firstname || u.firstname || "",
          lastname: u.name?.lastname || u.lastname || "",
          street: u.address?.street || u.street || "",
          city: u.address?.city || u.city || "",
          number: u.address?.number || u.number || "",
        }));

        const combinedUsers = [...localUsers];

        normalizedApiUsers.forEach((apiUser) => {
          const exists = combinedUsers.some(
            (u) =>
              (u.email &&
                apiUser.email &&
                u.email.toLowerCase() === apiUser.email.toLowerCase()) ||
              (u.username &&
                apiUser.username &&
                u.username === apiUser.username),
          );
          if (!exists) combinedUsers.push(apiUser);
        });

        setRegisteredUsers(combinedUsers);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
        setRegisteredUsers(localUsers); // Fallback ke data lokal jika API gagal
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const deleteUser = (userIdentifier) => {
    if (!userIdentifier) return; // Guard clause jika ID/Identifier kosong

    const isMatch = (u) =>
      (u.id && String(u.id) === String(userIdentifier)) ||
      (u.email && u.email === userIdentifier) ||
      (u.username && u.username === userIdentifier);

    setRegisteredUsers((prev) => prev.filter((u) => !isMatch(u)));

    const updatedLocal = getLocalUsers().filter((u) => !isMatch(u));
    localStorage.setItem("registered_users", JSON.stringify(updatedLocal));
  };

  return { registeredUsers, loading, deleteUser };
};
