import React, { useState } from 'react'

const AddUserModal = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(import.meta.env.VITE_USERS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log("User added:", data)
      setFormData({ name: "", username: "", email: "" })
    } catch (error) {
      console.log("Error adding user:", error)
    }
  }

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
