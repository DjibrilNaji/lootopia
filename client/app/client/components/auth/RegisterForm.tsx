import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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
import { register } from "~/client/services/auth"
import { signupFormSchema, SignupType } from "~/types/form"

interface RegisterProps {
  setCheckEmail: (value: boolean) => void
}

export function Register({ setCheckEmail }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword((prevState) => !prevState)

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  const { isLoading, mutate } = useCustomMutation(
    async (values: SignupType) => await register(values),
    {
      onSuccess: (data) => {
        setCheckEmail(true)
        toast.success(data.customMessage)
      }
    }
  )

  const handleSubmit = (values: SignupType) => mutate(values)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex h-full w-full flex-col justify-center space-y-6 lg:w-3/4"
      >
        <h1 className="text-center text-4xl font-bold">Inscription</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d&apos;utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="Entrez votre nom d'utilisateur" {...field} maxLength={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-r-lg border-y border-r bg-white"
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
          S&apos;inscrire
        </Button>
      </form>
    </Form>
  )
}
