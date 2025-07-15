import { AllDataLengthDto, ApiResponse, UserDto } from "~/types/api"
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

export const deleteUser = async (userId: number): Promise<ApiResponse> => {
  const response = await axiosClient.delete(routes.api.user.delete(userId), {
    withCredentials: true
  })

  return response.data
}

export const getUser = async (email: string): Promise<UserDto> => {
  const response = await axiosClient.get(routes.api.user.one(email), { withCredentials: true })

  return response.data.data
}

export const getUsers = async (): Promise<UserDto[]> => {
  const response = await axiosClient.get(routes.api.user.all, { withCredentials: true })

  return response.data.data
}

export const getAllDataLength = async (): Promise<AllDataLengthDto> => {
  const response = await axiosClient.get(routes.api.user.getAllDataLength, {
    withCredentials: true
  })

  return response.data
}
