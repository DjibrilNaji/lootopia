import { AxiosError } from "axios"

import routes from "~/client/routes"
import axiosClient from "~/client/utils/axiosInstance"
import { ApiResponse, RegisterDto, LoginDto, ApiAuthResponse } from "~/types/api"

const headers = (credentials: string) => ({
  Authorization: `Basic ${credentials}`,
  "Content-Type": "application/json"
})

export const register = async (registerDto: RegisterDto): Promise<ApiResponse> => {
  const credentials = btoa(`admin:test`)
  const data = await axiosClient.post(routes.api.auth.register, registerDto, {
    headers: headers(credentials)
  })

  return data.data
}

export const verifyAccount = async (userEmail: string, activationCode: string) => {
  const credentials = btoa(`admin:test`)
  const data = await axiosClient.get(routes.api.auth.verify(userEmail, activationCode), {
    headers: headers(credentials)
  })

  return data.data
}

export const login = async (loginDto: LoginDto): Promise<ApiAuthResponse> => {
  try {
    const credentials = btoa(`admin:test`)
    const { data } = await axiosClient.post(routes.api.auth.login, loginDto, {
      withCredentials: true,
      headers: headers(credentials)
    })

    return {
      ...data,
      customMessage: data.customMessage || "Connexion réussie !"
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401 && error.response?.data?.requires2fa) {
        throw new Error("2FA requis. Un code a été envoyé à votre email.")
      }

      throw new Error(error.response?.data?.message || "Échec de la connexion")
    } else {
      throw new Error("Erreur système")
    }
  }
}

export const logout = async (): Promise<{ success: boolean; message?: string }> => {
  try {
    const credentials = btoa(`admin:test`)
    await axiosClient.post(
      routes.api.auth.logout,
      {},
      {
        withCredentials: true,
        headers: headers(credentials)
      }
    )

    const cleanClient = () => {
      ;["accessToken"].forEach((name) => {
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`
      })
      sessionStorage.clear()
    }

    if (typeof window !== "undefined") {
      cleanClient()
      window.location.href = `${routes.home}?logout=success`
      return { success: true }
    }

    return { success: false, message: "Environnement non supporté" }
  } catch (error) {
    if (typeof window !== "undefined") {
      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.trim().split("=")
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT`
      })
      window.location.href = `${routes.home}?logout=forced`
    }

    return {
      success: false,
      message:
        error instanceof AxiosError
          ? error.response?.data?.message || "Erreur serveur"
          : "Erreur inconnue"
    }
  }
}

export const verifyMFA = async (email: string, inputCode: string): Promise<ApiAuthResponse> => {
  try {
    const credentials = btoa(`admin:test`)
    const { data } = await axiosClient.post(
      routes.api.auth.verifyMFA(),
      { email, inputCode },
      {
        headers: headers(credentials),
        withCredentials: true
      }
    )
    return data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la vérification du code MFA."
      )
    } else {
      throw new Error("Une erreur inconnue est survenue.")
    }
  }
}
