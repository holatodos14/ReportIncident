import { useContext, useState } from 'react'
import { IncidentsListContext } from '../context/IncidentsContext'
import { useLogin } from '../context/LoginContext'
import Modal from './Modal'
import { deleteIncident } from '../services/incidentsServices.jsx'

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
}

const Completed = () => {
  const { data, refetch } = useContext(IncidentsListContext)
  const { user } = useLogin()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIncidents, setSelectedIncidents] = useState([])
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredIncidents = data
    .filter(
      (incident) =>
        incident.status.toLowerCase() === 'resolved' &&
        (incident.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
         incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         incident.incident_type.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  const handleCheckboxChange = (id) => {
    setSelectedIncidents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    )
  }

  const handleDeleteClick = async () => {
    try {
      for (const id of selectedIncidents) {
        await deleteIncident(id)
      }
      refetch()
      setSelectedIncidents([])
    } catch (error) {
      console.error("Error deleting incidents", error)
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-teal-700">
          <h1 className="text-3xl font-bold text-white">Completed Incidents</h1>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full sm:w-1/3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {user?.userType === 'administrator' && (
              <button
                onClick={handleDeleteClick}
                className="ml-4 bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition duration-300 ease-in-out"
              >
                Delete Selected
              </button>
            )}
          </div>

          {filteredIncidents.length > 0 ? (
            <div className="space-y-4">
              {filteredIncidents.map((incident) => (
                <div
                  key={incident.idIncident}
                  className="bg-white rounded-lg shadow p-4 hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {user?.userType === 'administrator' && (
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
                      <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                        {incident.status}
                      </span>
                      <button
                        onClick={() => handleIncidentClick(incident)}
                        className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition duration-300 ease-in-out"
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
              No resolved incidents found.
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

export default Completed
