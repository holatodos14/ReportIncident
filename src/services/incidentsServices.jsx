import axios from "axios"

const API_URL = "http://localhost:3000/api/incidents"

export const getIncidents = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error("Error fetching incidents", error)
    throw error
  }
}

export const getIncidentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching incident with ID ${id}`, error)
    throw error
  }
}

export const createIncident = async (incident) => {
  try {
    const response = await axios.post(API_URL, incident)
    return response.data
  } catch (error) {
    console.error("Error creating incident:", error)
    throw error
  }
}

export const updateIncident = async (id, updatedIncident) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updatedIncident)
    return response.data
  } catch (error) {
    console.error(`Error updating incident with ID ${id}`, error)
    throw error
  }
}

export const deleteIncident = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting incident with ID ${id}`, error)
    throw error
  }
}