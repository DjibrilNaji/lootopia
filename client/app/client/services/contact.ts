import { ApiResponse, ContactDto } from "~/types/api"
import routes from "../routes"
import axiosClient from "../utils/axiosInstance"

export const contact = async (contactDto: ContactDto): Promise<ApiResponse> => {
  const data = await axiosClient.post(routes.api.contact, contactDto, {
        withCredentials: true
  })

  return data.data
}
