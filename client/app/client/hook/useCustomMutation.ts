import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { toast } from "sonner"

import { ApiError } from "~/types/api"

export function useCustomMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, ApiError, TVariables>
) {
  return useMutation({
    mutationFn,
    onError: (error: ApiError) => {
      let errorMessage = "Une erreur inattendue est survenue."

      if (error.response?.data?.customMessage) {
        errorMessage = error.response.data.customMessage
      } else if (error.message?.includes("Network Error")) {
        errorMessage = "Problème de connexion. Vérifiez votre réseau."
      } else if (error.message?.includes("timeout")) {
        errorMessage = "Le serveur met trop de temps à répondre. Réessayez plus tard."
      }

      toast.error(errorMessage)
    },
    ...options
  })
}
