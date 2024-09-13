import { useContext, useState, useEffect } from "react"
import { IncidentsListContext } from "../context/IncidentsContext"
import { useLogin } from "../context/LoginContext"
import { updateIncident } from "../services/incidentsServices.jsx"
import Modal from "./Modal"

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
}

export const ViewIncidents = () => {
  const { data, refetch } = useContext(IncidentsListContext)
  const { user } = useLogin()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIncidents, setSelectedIncidents] = useState([])
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {

    const intervalId = setInterval(() => {
      refetch()
    }, 1000)
    
    return () => clearInterval(intervalId)
  }, [refetch])

  const filteredIncidents = data
    .filter(
      (incident) =>
        incident.status.toLowerCase() === "pending" ||
        incident.status.toLowerCase() === "in progress"
    )
    .filter(
      (incident) =>
        incident.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.incidentType.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleCheckboxChange = (id) => {
    setSelectedIncidents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    )
  }

  const handleSaveClick = async () => {
    try {
      for (const id of selectedIncidents) {
        await updateIncident(id, { status: "resolved" })
      }
      refetch()
    } catch (error) {
      console.error("Error updating incidents", error)
    }
  }

  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedIncident(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-300 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 bg-teal-600">
          <h1 className="text-3xl font-bold text-white">View Incidents</h1>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-1/3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <div className="space-x-4">
              {user?.user_type === "administrator" && (
                <button
                  onClick={handleSaveClick}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-300 ease-in-out"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>

          {filteredIncidents.length > 0 ? (
            <div className="space-y-4">
              {filteredIncidents.map((incident) => (
                <div
                  key={incident.idIncident}
                  className="bg-gray-50 rounded-lg shadow p-4 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {user?.user_type === "administrator" && (
                        <input
                          type="checkbox"
                          checked={selectedIncidents.includes(incident.idIncident)}
                          onChange={() => handleCheckboxChange(incident.idIncident)}
                          className="h-5 w-5 text-teal-600"
                        />
                      )}
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{truncateText(incident.subject, 30)}</h2>
                        <p className="text-gray-600">{truncateText(incident.description, 50)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        incident.status.toLowerCase() === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'
                      }`}>
                        {incident.status}
                      </span>
                      <button
                        onClick={() => handleIncidentClick(incident)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-300 ease-in-out"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-2xl text-center text-gray-600 mt-10">
              No pending incidents found.
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal incident={selectedIncident} onClose={closeModal} />
      )}
    </div>
  )
}
