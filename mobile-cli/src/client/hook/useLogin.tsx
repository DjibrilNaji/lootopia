import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../services/auth";
import { checkError } from "../utils/checkError";

type UseLoginProps = {
  onSuccess?: (data: any) => void;
  onMFARequired?: () => void;
};

export function useLogin({ onSuccess, onMFARequired }: UseLoginProps) {
  const [apiError, setApiError] = useState("")

  const mutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => await login(values),
    onSuccess: (data) => {
      setApiError("")
      if (data.mfaRequired) {
        if (onMFARequired) onMFARequired()
      } else {
        if (onSuccess) onSuccess(data)
      }
    },
    onError: (error: any) => {
      setApiError(checkError(error))
    }
  })

  return {
    ...mutation,
    apiError
  }
}
