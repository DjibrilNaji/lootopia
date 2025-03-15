import { ApiResponse, ContactDto } from "~/types/api"
import routes from "../routes"
import axiosClient from "../utils/axiosInstance"

const headers = (credentials: string) => ({
  Authorization: `Basic ${credentials}`,
  "Content-Type": "application/json"
})

export const contact = async (contactDto: ContactDto): Promise<ApiResponse> => {
  const credentials = btoa(`admin:test`)
  const data = await axiosClient.post(routes.api.contact, contactDto, {
    headers: headers(credentials)
  })

  return data.data
}
