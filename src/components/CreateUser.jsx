import { useState } from "react"
import { createUser } from "../services/createUServices"
import background from "../assets/background.png"

const CreateUser = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_type: "resident",
  })

  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createUser(formData)
      setMessage("User created successfully. Do you want to create another one?")
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        user_type: "resident",
      })
    } catch (error) {
      setMessage("Error creating user, please try again.")
      console.error("Error creating user:", error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-teal-100 to-blue-200 flex bg-cover bg-center h-screen justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex flex-col gap-6 border-[2px] border-teal-600 rounded-xl p-8 max-w-md w-full bg-white bg-opacity-80 shadow-lg">
        <h1 className="text-teal-800 text-4xl font-bold mb-6">Register a New User</h1>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full h-12 rounded-md px-4 border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full h-12 rounded-md px-4 border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full h-12 rounded-md px-4 border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full h-12 rounded-md px-4 border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <select
          name="user_type"
          value={formData.user_type}
          onChange={handleChange}
          className="w-full h-12 rounded-md px-4 border border-teal-300 bg-teal-50 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="resident">Resident</option>
          <option value="administrator">Administrator</option>
        </select>
        <button
          type="submit"
          className="bg-teal-600 text-white w-full h-12 rounded-md font-semibold hover:bg-teal-700 transition duration-300"
        >
          Create User
        </button>
        {message && (
          <p className="text-teal-600 text-lg mt-4 bg-teal-100 p-3 rounded-md">
            {message}
          </p>
        )}
      </div>
    </form>
  )
}

export default CreateUser
