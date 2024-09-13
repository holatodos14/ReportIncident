import { Link } from "wouter"
import { useLogin } from "../context/AuthContext"
import sopita from "/alertwi.png"
import signOut from "../assets/sign-out.png"

export const Navbar = () => {
  const { user, logout: logoutFunction } = useLogin()

  const handleLogout = () => {
    localStorage.removeItem('token')
    logoutFunction()
  }

  return (
    <div className="font-sans">
      <nav className="bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg">
        <div className="flex justify-between items-center px-6 h-16 text-white">
          <div className="flex items-center gap-4">
            <img
              src={sopita}
              alt="PC Alert Icon"
              className="w-12 h-12"
            />
          </div>
          <ul className="flex items-center gap-8">
            <li>
              <Link href="/home" className="hover:text-teal-200 transition duration-300 ease-in-out">Home</Link>
            </li>

            {user && user.user_type === 'administrator' && (
              <li><Link href="/createuser">Create User</Link></li>
            )}

            {user?.user_type === 'resident' && (
              <li>
                <Link href="/create" className="hover:text-teal-200 transition duration-300 ease-in-out">Create</Link>
              </li>
            )}
            <li>
              <Link href="/viewincidents" className="hover:text-teal-200 transition duration-300 ease-in-out">View Incidents</Link>
            </li>
            {user?.user_type === 'administrator' && (
              <li>
                <Link href="/completed" className="hover:text-teal-200 transition duration-300 ease-in-out">Completed</Link>
              </li>
            )}
            <li>
              <img
                src={signOut}
                alt="Logout Icon"
                className="w-6 h-6 cursor-pointer hover:opacity-80 transition duration-300 ease-in-out"
                onClick={handleLogout}
              />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
