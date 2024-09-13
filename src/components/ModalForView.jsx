/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { getImage } from '../services/imageServices'

const ModalForView = ({ incident, onClose }) => {
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    const fetchImage = async () => {
      if (incident.image) {
        try {
          const url = await getImage(incident.image)
          setImageUrl(url)
        } catch (error) {
          console.error('Error fetching image:', error)
        }
      }
    }

    fetchImage()
  }, [incident])

  if (!incident) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Incident Details</h2>
        <div className="space-y-4">
          <p><span className="font-semibold text-gray-700">Subject:</span> {incident.subject}</p>
          <p><span className="font-semibold text-gray-700">Description:</span> {incident.description}</p>
          <p><span className="font-semibold text-gray-700">Creation Date:</span> {incident.report_date}</p>
          <p><span className="font-semibold text-gray-700">Incident Type:</span> {incident.incident_type}</p>
          <p><span className="font-semibold text-gray-700">Status:</span> {incident.status}</p>
          {imageUrl && (
            <div>
              <p className="font-semibold text-gray-700">Image:</p>
              <img src={imageUrl} alt="Incident" className="mt-2 max-w-full h-auto rounded-lg" />
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ModalForView