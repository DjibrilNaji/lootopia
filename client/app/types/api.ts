export type ApiResponse = {
  customMessage: string
}

export type ApiAuthResponse = {
  requires2fa?: string
  customMessage: string
  token: string
}

export type ApiListResponse<T> = {
  count: number
  data: T[]
}

export type HuntListResponse = ApiListResponse<HuntDto>

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

export type HuntDto = {
  id?: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  privateHunt: boolean
  latitude: number
  longitude: number
  draft: boolean
  slug: string
}

export type UserDto = {
  id: number
  username: string
  email: string
  isActive: boolean
  twoFactorEnabled?: boolean
  createdAt: Date
}

export type UpdatePasswordDto = {
  email: string
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export type DesactivationRequestDto = {
  email: string
  password: string
}
