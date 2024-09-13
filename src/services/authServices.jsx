import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth' 

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    
    return response.data
  } catch (error) {
    console.error('Login error:', error.response?.data?.message || error.message)
    throw error 
  }
}

const getMe = async () => {
  try {
    
    const token = localStorage.getItem('token')
    
    if (!token) throw new Error('No token available')

    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })

    return response.data
  } catch (error) {
    console.error('Error getting user data:', error.response?.data?.message || error.message)
    throw error 
  }
}

export { login, getMe }