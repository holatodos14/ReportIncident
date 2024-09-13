import axios from 'axios'

const API_URL = 'http://localhost:3000/api/users'

export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData)
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error retrieving users:', error)
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}
