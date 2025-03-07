import axios from "axios"

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000
})

export default axiosClient
