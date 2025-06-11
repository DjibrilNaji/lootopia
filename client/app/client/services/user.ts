import { ApiResponse, UserDto } from "~/types/api"
import routes from "../routes"
import axiosClient from "../utils/axiosInstance"

export const update = async (
  userId: number,
  userDto: Pick<UserDto, "username" | "email">
): Promise<ApiResponse> => {
  const data = await axiosClient.put(routes.api.user.update(userId), userDto, {
    withCredentials: true
  })

  return data.data
}

export const getUser = async (email: string): Promise<UserDto> => {
  const response = await axiosClient.get(routes.api.user.one(email), { withCredentials: true })

  return response.data.data
}
