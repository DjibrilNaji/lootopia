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

export const contactFormSchema = z
  .object({
    name: stringValidator.min(1, "Le nom est requis"),
    email: emailValidator,
    subject: stringValidator.min(1, "Le sujet est requis"),
    message: stringValidator.min(1, "Le message est requis")
  })
  .required()

export type ContactFormType = z.infer<typeof contactFormSchema>

export const signInFormSchema = z
  .object({
    email: emailValidator,
    password: passwordValidator
  })
  .required()

export type SignInType = z.infer<typeof signInFormSchema>
