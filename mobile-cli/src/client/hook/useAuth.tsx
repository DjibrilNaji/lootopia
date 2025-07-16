import { useEffect, useState } from "react"
import * as SecureStore from "expo-secure-store"
import { router } from "expo-router";

export function useAuth() {
  const [user, setUser] = useState<{
    user: string; username: string; email: string 
} | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const json = await SecureStore.getItemAsync("user")
      if (json) setUser(JSON.parse(json))
    }

    loadUser()
  }, [])

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken")
    await SecureStore.deleteItemAsync("user")
    setUser(null),
    router.push("/") 
  }

  return { user, logout }
}
