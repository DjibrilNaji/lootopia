import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "~/client/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/client/components/ui/form"
import { Input } from "~/client/components/ui/input"
import { useCustomMutation } from "~/client/hook/useCustomMutation"
import { login } from "~/client/services/auth"
import { signInFormSchema, SignInType } from "~/types/form"
import { MFAVerificationForm } from "./MFAVerificationForm"

interface LoginProps {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isMFARequired, setIsMFARequired] = useState(false)
  const [email, setEmail] = useState("")

  const handleShowPassword = () => setShowPassword((prevState) => !prevState)

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const { isLoading, mutate } = useCustomMutation(
    async (values: SignInType) => {
      return await login(values)
    },
    {
      onSuccess: (data, values) => {
        if (data?.requires2fa) {
          setEmail(values.email)
          setIsMFARequired(true)
          toast.info("Un code MFA a été envoyé à votre email.")
        } else {
          toast.success(data?.customMessage)
          onSuccess()
        }
      },
      onError: (error) => {
        toast.error(error.message)
      }
    }
  )

  const handleSubmit = (values: SignInType) => {
    mutate(values)
  }

  if (isMFARequired) {
    return (
      <MFAVerificationForm
        key="mfa"
        email={email}
        onSuccess={onSuccess}
        onBack={() => setIsMFARequired(false)}
      />
    )
  }

  return (
    <Form key="login" {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto flex h-full w-96 flex-col justify-center space-y-6 lg:w-3/4"
      >
        <h1 className="text-center text-4xl font-bold">Connexion</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Entrez votre email" {...field} maxLength={50} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Entrez votre mot de passe"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
                    type="button"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <LoaderCircleIcon className="-ms-1 animate-spin" size={16} />}
          Se connecter
        </Button>
      </form>
    </Form>
  )
}
