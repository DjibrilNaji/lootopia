import { ApiError } from "@/src/types/api"

export const checkError = (error: ApiError) => {
  let errorMessage = "Une erreur inattendue est survenue."

  if (error.response?.data?.customMessage) {
    errorMessage = error.response.data.customMessage
  } else if (error.message?.includes("Network Error")) {
    errorMessage = "Problème de connexion. Vérifiez votre réseau."
  } else if (error.message?.includes("timeout")) {
    errorMessage = "Le serveur met trop de temps à répondre. Réessayez plus tard."
  }

  return errorMessage
}
