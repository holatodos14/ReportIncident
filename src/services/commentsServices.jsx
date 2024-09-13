import axios from "axios"

const API_URL = "http://localhost:3000/api/comments"

export const getComments = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error("Error fetching comments", error)
    throw error
  }
}

export const createComment = async (newComment) => {
  try {
    const response = await axios.post(API_URL, newComment)
    return response.data
  } catch (error) {
    console.error("Error creating comment", error)
    throw error
  }
}

export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting comment with ID ${id}`, error)
    throw error
  }
}
