/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocation } from 'wouter'
import { login as loginService, getMe as getMeService } from '../services/authServices.jsx'

const AuthContext = createContext()

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [, setLocation] = useLocation()

  const getToken = () => localStorage.getItem('token')
  const removeToken = () => localStorage.removeItem('token')

  useEffect(() => {
    const token = getToken()
    if (token) {
      getMeService()
        .then((data) => setUser(data))
        .catch(() => {
          removeToken()
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => loginService(email, password),
    onSuccess: (data) => {
      setUser(data.user)
      setLocation('/home')
    },
    onError: (error) => {
      console.error('Login error:', error.message)
    },
  })
  const logout = () => {
    removeToken()
    setUser(null)
    setLocation('/login')
  }

  useQuery({
    queryKey: ['me'],
    queryFn: getMeService,
    enabled: !!getToken(),
    onSuccess: (data) => {
      setUser(data)
    },
    onError: () => {
      setUser(null)
      removeToken()
      setLocation('/login')
    },
  })

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: loginMutation.mutate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useLogin = () => useContext(AuthContext)
