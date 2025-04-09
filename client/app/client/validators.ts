import { z } from "zod"

export const stringValidator = z.string()

export const emailValidator = z.string().email("L'email est invalide")

export const passwordValidator = z
  .string()
  .min(10, "Le mot de passe doit contenir au moins 10 caractères")
  .regex(
    /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
    "Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
  )

export const mfaCodeValidator = z.string().min(6, "Le code doit contenir au moins 6 caractères")

export const usernameValidator = z
  .string()
  .min(5, "Le username doit contenir au moins 5 caractères")
