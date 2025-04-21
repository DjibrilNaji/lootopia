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

export const huntFormSchema = z
  .object({
    name: stringValidator.min(5, "Le nom de la chasse doit contenir au moins 5 caractères"),
    description: stringValidator.min(
      5,
      "La description de la chasse doit contenir au moins 5 caractères"
    ),
    startDate: z.date({
      required_error: "La date de début est requise"
    }),
    endDate: z.date({
      required_error: "La date de début est requise"
    }),
    privateHunt: z.boolean(),
    draft: z.boolean()
  })
  .required()

export type HuntType = z.infer<typeof huntFormSchema>

export const huntDraftSchema = z.object({
  name: stringValidator.min(1, "Le nom est requis"),
  description: stringValidator.optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  privateHunt: z.boolean().optional(),
  draft: z.literal(true)
})
