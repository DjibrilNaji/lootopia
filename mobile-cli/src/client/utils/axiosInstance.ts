import axios from "axios"

export const axiosClient = axios.create({
  baseURL: "http://192.168.1.156:8080/api",
  timeout: 5000
})
