import { useState } from "react"
import { createIncident } from "../services/incidentsServices"

export const Create = () => {
  const [incident, setIncident] = useState({
    subject: "",
    incident_type: "",
    description: "",
    location: "",
  })

  const handleChange = (e) => {
    setIncident({
      ...incident,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (e) => {
    setIncident({
      ...incident,
      incident_type: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createIncident(incident)
      alert("Incident created successfully")
      setIncident({
        subject: "",
        incident_type: "",
        description: "",
        location: "",
      })
    } catch (error) {
      console.error("Error creating the incident", error)
      alert("There was an error creating the incident")
    }
  }

  return (
    <div className="bg-gradient-to-br from-teal-400 to-cyan-500 h-[90vh] bg-cover bg-center flex flex-col justify-center items-center p-8">
      <h2 className="text-white font-bold text-4xl text-center uppercase mb-8">Create Incident</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-6">
        <input
          type="text"
          name="subject"
          placeholder="What happened? (Title/Description)"
          value={incident.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
        />
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="incident_type"
              placeholder="Incident Type, e.g., Plumbing"
              value={incident.incident_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            />
            <select
              name="incident_type_select"
              onChange={handleSelectChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            >
              <option value="">Select an incident type</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electricity">Electricity</option>
              <option value="Heating and Air Conditioning">Heating and Air Conditioning</option>
              <option value="Security">Security</option>
              <option value="Structure and Construction">Structure and Construction</option>
              <option value="Pests and Infestations">Pests and Infestations</option>
              <option value="General Services">General Services</option>
              <option value="Furniture and Equipment">Furniture and Equipment</option>
            </select>
          </div>
          <textarea
            name="description"
            placeholder="Write a description of what happened"
            value={incident.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />
          <input
            type="text"
            name="location"
            placeholder="Location: Place - Floor Number"
            value={incident.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />
        </div>
        <button type="submit" className="bg-teal-600 text-white rounded-lg w-full py-3 hover:bg-teal-700 transition duration-300 ease-in-out">Create Incident</button>
      </form>
    </div>
  )
}
