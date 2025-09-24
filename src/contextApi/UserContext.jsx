import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const usersAPI = import.meta.env.VITE_USERS_API;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(usersAPI);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers, loading, fetchUsers, showAddUserModal, setShowAddUserModal }}>
      {children}
    </UserContext.Provider>
  );
};
