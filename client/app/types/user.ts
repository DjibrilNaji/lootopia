export interface User {
  id: number
  username: string
  email: string
  passwordHash: string
  isActive: boolean
  activationCode: string
  twoFactorEnabled?: boolean
  createdAt: Date
}

export interface UserPayload {
  sub: string
}
