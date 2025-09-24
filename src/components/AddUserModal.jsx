import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contextApi/UserContext'

const AddUserModal = () => {
  const {
    userIdToEdit,
    usersAPI,
    isEdit,
    editUser,
    addUser,
    setIsEdit,
    setShowAddUserModal,
  } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    const getUser = async () => {
      if (!userIdToEdit) return;
      try {
        const res = await fetch(`${usersAPI}/${userIdToEdit}`);
        const data = await res.json();
        setFormData({
          name: data.name,
          username: data.username,
          email: data.email
        });
      } catch (error) {
        console.log("Edit user failed:", error);
      }
    };
    if (isEdit) getUser();
  }, [userIdToEdit, usersAPI, isEdit]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await editUser(userIdToEdit, formData);
      setIsEdit(false);
    } else {
      await addUser(formData);
    }

    setFormData({ name: "", username: "", email: "" });
    setShowAddUserModal(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 my-4 bg-white rounded-2xl shadow-lg shadow-black flex flex-col gap-4 min-w-auto w-96 md:w-[600px]"
    >
      <h2 className="text-xl font-semibold text-center">Add New User</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
        required
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-slate-900 text-white py-2 rounded hover:bg-blue-600"
      >
        Add User
      </button>
    </form>
  )
}

export default AddUserModal
