/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query"
import { createContext } from "react"
import { getIncidents } from "../services/incidentsServices.jsx"

export const IncidentsListContext = createContext()

export const IncidentsList = ({ children }) => {
  const { data, refetch } = useQuery({
    queryKey: ['incidents'],
    queryFn: getIncidents
  })

  return (
    <IncidentsListContext.Provider value={{ data, refetch }}>
      {children}
    </IncidentsListContext.Provider>
  )
}