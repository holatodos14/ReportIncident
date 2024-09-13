/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocation } from 'wouter'
import { login as loginService, getMe as getMeService } from '../services/authServices.jsx'

const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [, setLocation] = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMeService()
        .then(data => {
          setUser(data)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setUser(null)
        })
        .finally(() => {
          setLoading(false)
        })
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
    localStorage.removeItem('token')
    setUser(null)
    setLocation('/login')
  }

  useQuery({
    queryKey: ['me'],
    queryFn: getMeService,
    enabled: !!localStorage.getItem('token'),
    onSuccess: (data) => {
      setUser(data)
    },
    onError: () => {
      setUser(null)
      localStorage.removeItem('token')
      setLocation('/login')
    },
  })

  return (
    <LoginContext.Provider
      value={{
        user,
        loading,
        login: loginMutation.mutate,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => React.useContext(LoginContext)