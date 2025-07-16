import { useQuery } from "@tanstack/react-query"
import {
  fetchHunts,
  fetchMessages,
  fetchUsers,
  mockHunts,
  mockMessages,
  mockUsers
} from "~/lib/api"

// Hook pour récupérer les utilisateurs
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // En mode développement, utiliser les données mockées
      if (process.env.NODE_ENV === "development") {
        return mockUsers
      }
      return fetchUsers()
    }
  })
}

// Hook pour récupérer les chasses
export const useHunts = () => {
  return useQuery({
    queryKey: ["hunts"],
    queryFn: async () => {
      // En mode développement, utiliser les données mockées
      if (process.env.NODE_ENV === "development") {
        return mockHunts
      }
      return fetchHunts()
    }
  })
}

// Hook pour récupérer les messages
export const useMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      // En mode développement, utiliser les données mockées
      if (process.env.NODE_ENV === "development") {
        return mockMessages
      }
      return fetchMessages()
    }
  })
}
