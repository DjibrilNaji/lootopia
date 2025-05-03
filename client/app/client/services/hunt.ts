import { ApiResponse, HuntDto, HuntListResponse } from "~/types/api"
import routes from "../routes"
import axiosClient from "../utils/axiosInstance"

export const createHunt = async (huntDto: HuntDto, email: string): Promise<ApiResponse> => {
  const data = await axiosClient.post(routes.api.hunt.create(email), huntDto, {
    withCredentials: true
  })

  return data.data
}

export const getHunts = async (): Promise<HuntListResponse> => {
  const response = await axiosClient.get(routes.api.hunt.all, { withCredentials: true })

  return response.data
}

export const getHunt = async (slug: string): Promise<HuntDto> => {
  const response = await axiosClient.get(routes.api.hunt.one(slug), { withCredentials: true })

  return response.data.data
}

export const updateHunt = async (huntDto: HuntDto, email: string): Promise<ApiResponse> => {
  const data = await axiosClient.post(routes.api.hunt.update(email), huntDto, {
    withCredentials: true
  })

  return data.data
}
