import { useState, useEffect } from "react";

export const useAdminUsers = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLocalUsers = () =>
    JSON.parse(localStorage.getItem("registered_users")) || [];

  useEffect(() => {
    const fetchAllUsers = async () => {
      const localUsers = getLocalUsers();
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/users");
        const apiUsers = await res.json();

        const combinedUsers = [...localUsers];
        apiUsers.forEach((apiUser) => {
          const exists = combinedUsers.some(
            (u) =>
              (u.email && u.email === apiUser.email) ||
              (u.username && u.username === apiUser.username),
          );
          if (!exists) combinedUsers.push(apiUser);
        });

        setRegisteredUsers(combinedUsers);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
        setRegisteredUsers(localUsers);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const deleteUser = (userIdentifier) => {
    const isMatch = (u) =>
      u.email === userIdentifier ||
      u.username === userIdentifier ||
      u.id === userIdentifier;

    setRegisteredUsers((prev) => prev.filter((u) => !isMatch(u)));

    const updatedLocal = getLocalUsers().filter((u) => !isMatch(u));
    localStorage.setItem("registered_users", JSON.stringify(updatedLocal));
  };

  return { registeredUsers, loading, deleteUser };
};
