import { z } from "zod"
import { emailValidator, passwordValidator, stringValidator } from "~/client/validators"

export const signupFormSchema = z
  .object({
    username: stringValidator.min(5, "Le nom d'utilisateur doit contenir au moins 5 caractères"),
    email: emailValidator,
    password: passwordValidator
  })
  .required()

export type SignupType = z.infer<typeof signupFormSchema>
