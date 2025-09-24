import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const usersAPI = import.meta.env.VITE_USERS_API;
  const [isEdit, setIsEdit] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState("");
  const [searchText, setSearchText] = useState("");
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

    const addUser = async (newUser) => {
    try {
      setLoading(true);
      const res = await fetch(usersAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      setUsers((prev) => [...prev, data]);
    } catch (error) {
      console.log("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (id, editedData) => {
    try {
      setLoading(true);
      const res = await fetch(`${usersAPI}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedData),
      });
      const data = await res.json();
      console.log("Edited used:", data);
    } catch (error) {
      console.log("Error while editing:", error);
    } finally {
      setLoading(false);
    }
  };

const deleteUser = async (id) => {
  try {
    const res = await fetch(`${usersAPI}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      console.log("User deleted successfully");
    } else {
      console.log("Failed to delete user");
    }
  } catch (error) {
    console.log("Failed deleting user:", error);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider 
    value={{ 
      users, setUsers, 
      usersAPI,
      loading, 
      fetchUsers, 
      showAddUserModal, setShowAddUserModal,
      editUser, addUser, deleteUser,
      isEdit, setIsEdit,
      userIdToEdit, setUserIdToEdit,
      searchText, setSearchText,
      }}>
      {children}
    </UserContext.Provider>
  );
};
