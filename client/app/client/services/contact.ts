import { ApiResponse, ContactFormType, ContactListResponse } from "~/types/api"
import routes from "../routes"
import axiosClient from "../utils/axiosInstance"

export const contact = async (contactDto: ContactFormType): Promise<ApiResponse> => {
  const data = await axiosClient.post(routes.api.contact, contactDto, {
    withCredentials: true
  })

  return data.data
}

export const getContacts = async (): Promise<ContactListResponse> => {
  const response = await axiosClient.get(routes.api.contact, { withCredentials: true })

  return response.data
}
