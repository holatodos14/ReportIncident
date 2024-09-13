import axios from 'axios'

const API_URL = 'http://localhost:3000/api/images'

export const uploadImage = async (file) => {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data 
  } catch (error) {
    console.error('Error uploading the image:', error.response?.data || error.message)
    throw error
  }
}

export const getImage = async (imageName) => {
  try {
    const response = await axios.get(`${API_URL}/${imageName}`, {
      responseType: 'blob',
    })

    const imageUrl = URL.createObjectURL(response.data)
    return imageUrl
  } catch (error) {
    console.error('Error retrieving the image:', error.response?.data || error.message)
    throw error
  }
}
