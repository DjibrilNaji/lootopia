import apiRoutes from "@/src/client/routes"
import { axiosClient } from "@/src/client/utils/axiosInstance"
import { ApiResponse, RegisterDto } from "@/src/types/api"

export const register = async (registerDto: RegisterDto): Promise<ApiResponse> => {
  const credentials = btoa(`admin:test`)
  const data = await axiosClient.post(apiRoutes.api.register, registerDto, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json"
    }
  })

  return data.data
}
