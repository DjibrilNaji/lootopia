import routes from "~/client/routes"
import axiosClient from "~/client/utils/axiosInstance"
import { ApiResponse, RegisterDto } from "~/types/api"

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
