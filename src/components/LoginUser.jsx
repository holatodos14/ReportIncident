import { useState } from 'react'
import { useLogin } from '../context/AuthContext'
import background from '../assets/background.png'
import { useLocation } from 'wouter'

export const LoginUser = () => {
  const { login, error } = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setLocation] = useLocation() 

  const handleLogin = async () => {
    try {
      await login({ email, password })
      
      setTimeout(() => {
        const token = localStorage.getItem('token')
        if (token) {
          setLocation('/home') 
        }
      }, 1000) 
    } catch (err) {
      console.error('Error during login:', err)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-xl ring-1 ring-gray-900/5">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Sign in to your account
        </h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-gray-600 font-medium">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600 font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-center text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300 ease-in-out"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
