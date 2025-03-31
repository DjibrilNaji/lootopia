import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { register } from "@/src/client/services/auth"
import { checkError } from "@/src/client/utils/checkError"
import { ApiError } from "@/src/types/api"
import { SignupType } from "@/src/types/form"

export default function useRegister() {
  const [apiError, setApiError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: SignupType) => await register(values),
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

  return {
    mutate,
    isPending,
    successMessage,
    apiError
  }
}
