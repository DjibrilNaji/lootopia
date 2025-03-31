export type ApiResponse = {
  customMessage: string
}

export type ApiAuthResponse = {
  requires2fa?: string
  customMessage: string
  token: string
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

export type ContactDto = {
  name: string
  email: string
  subject: string
  message: string
}

export type LoginDto = {
  email: string
  password: string
}
