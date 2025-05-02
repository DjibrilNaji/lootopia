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
import { updatePassword } from "~/client/services/auth"

const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    newPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères")
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"]
  })

type ForgotPasswordType = z.infer<typeof updatePasswordSchema>

interface UpdatePasswordFormProps {
  email: string
}

export function UpdatePasswordForm({ email }: UpdatePasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword((prevState) => !prevState)

  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  })

  const { isLoading, mutate } = useCustomMutation(
    async ({ oldPassword, newPassword, confirmPassword }: ForgotPasswordType) =>
      await updatePassword({ email, oldPassword, newPassword, confirmPassword }),
    {
      onSuccess: () => {
        toast.success("Mot de passe mis à jour avec succès.")
        form.reset()
      }
    }
  )

  const handleSubmit = async (values: ForgotPasswordType) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="m-10 flex flex-col space-y-6 lg:w-3/4"
      >
        <h1 className="text-xl font-semibold">Nouveau mot de passe</h1>
        <p className="text-sm text-muted-foreground">
          Vous pouvez modifier votre mot de passe ici. Veuillez entrer votre ancien mot de passe et
          le nouveau mot de passe que vous souhaitez utiliser.
        </p>

        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ancien mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Entrez votre ancien mot de passe"
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

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Entrez votre nouveau mot de passe"
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Confirmez votre nouveau mot de passe"
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
          Mettre à jour
        </Button>
      </form>
    </Form>
  )
}
