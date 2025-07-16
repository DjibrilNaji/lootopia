import { AxiosError } from "axios"
import * as SecureStore from 'expo-secure-store';

import apiRoutes from "@/src/client/routes"
import { axiosClient } from "@/src/client/utils/axiosInstance"
import { ApiResponse, RegisterDto, LoginDto, ApiAuthResponse} from "@/src/types/api"


export const register = async (registerDto: RegisterDto): Promise<ApiResponse> => {
  const data = await axiosClient.post(apiRoutes.api.register, registerDto, {
    withCredentials: true
  })

  return data.data
}


export const login = async (loginDto: LoginDto): Promise<ApiAuthResponse> => {
  try {
    const { data } = await axiosClient.post(apiRoutes.api.login, loginDto)

    if (data.requires2fa) {
      return {
        ...data,
        mfaRequired: true,
        customMessage: data.message
      }
    }

    if (data.token) {
      await SecureStore.setItemAsync("accessToken", data.token)
      if (data.user) {
        await SecureStore.setItemAsync("user", JSON.stringify(data.user))
      }
    }

    return {
      ...data,
      customMessage: data.customMessage || "Connexion réussie !"
    }
  } catch (error: unknown){
    if (error instanceof AxiosError) {
      if (error.response?.status === 401 && error.response?.data?.requires2fa) {
        throw new Error("2FA requis. Un code a été envoyé à votre email.")
      }
      throw new Error(error.response?.data?.message || "Échec de la connexion")
    }
    throw new Error("Erreur système")
  }
}

export const verifyMFA = async (email: string, inputCode: string): Promise<ApiAuthResponse> => {
  try {
    const { data } = await axiosClient.post(apiRoutes.api.verifyMFA(), { email, inputCode });

    if (data.token) {
      await SecureStore.setItemAsync("accessToken", data.token);
      if (data.user) {
        await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      }
    }
    
    return {
      ...data,
      customMessage: data.customMessage || "Connexion réussie !"
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("[MFA] Erreur Axios:", error.response?.data);
      throw new Error(error.response?.data?.message || "Erreur de vérification MFA");
    }
    console.error("[MFA] Erreur système:", error);
    throw new Error("Erreur système");
  }
}


export const logout = async (): Promise<{ success: boolean }> => {
  try {
    await SecureStore.deleteItemAsync('accessToken')
    
    return { success: true }
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error)
    return { success: false }
  }
}