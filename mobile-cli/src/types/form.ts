export type SignupType = {
  username: string
  email: string
  password: string
}

export type SignInType = {
  email: string
  password: string
}

export type SignInMFAType = {
  email: string
  inputCode: string
}
