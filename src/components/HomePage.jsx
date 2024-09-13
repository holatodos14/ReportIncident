import { Link } from "wouter"
import background from "../assets/background.png"
import { useLogin } from "../context/AuthContext"

const HomePage = () => {
  const { user } = useLogin()

  return (
    <div
      className="bg-gray-200 min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white bg-opacity-90 p-12 rounded-lg shadow-xl max-w-4xl w-full flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          {user?.user_type === 'administrator'
            ? "Solve issues on a grand scale. Your mission awaits."
            : "Log incidents or report issues easily. Let's get started!"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {user?.user_type === 'administrator' ? (
            <>
              <Link to="/viewincidents">
                <button className="w-full bg-teal-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105">
                  Manage Incidents
                </button>
              </Link>
              <Link to="/completed">
                <button className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-emerald-600 transition duration-300 ease-in-out transform hover:scale-105">
                  Complete & Archive
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/create">
                <button className="w-full bg-teal-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105">
                  Report an Incident
                </button>
              </Link>
              <Link to="/viewincidents">
                <button className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-emerald-600 transition duration-300 ease-in-out transform hover:scale-105">
                  View Your Incidents
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
