import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { verifyMFA } from "@/src/client/services/auth"
import { checkError } from "@/src/client/utils/checkError"
import { ApiError } from "@/src/types/api"
import { SignInMFAType } from "@/src/types/form"

export default function useMFA() {
  const [apiError, setApiError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: SignInMFAType) => {
      const { email, inputCode } = values;
      return await verifyMFA(email, inputCode)
    },
    onSuccess: (data) => {
      setApiError("")
      setSuccessMessage(data.customMessage)
    },
    onError: (error: ApiError) => {
      const errorMessage = checkError(error)
      setSuccessMessage("")
      setApiError(errorMessage)
    }
  })

  return { mutate, isPending, successMessage, apiError }
}