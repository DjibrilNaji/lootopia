export interface User {
  id: number
  username: string
  email: string
  passwordHash: string
  isActive: boolean
  activationCode: string
  createdAt: Date
}
