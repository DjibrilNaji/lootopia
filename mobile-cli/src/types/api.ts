export type ApiResponse = {
  customMessage: string
}

export type ApiError = {
  response?: { data?: { customMessage?: string } }
  message?: string
}

export type RegisterDto = {
  username: string
  email: string
  password: string
}
