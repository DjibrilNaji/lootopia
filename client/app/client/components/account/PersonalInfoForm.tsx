import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircleIcon } from "lucide-react"
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
import { logout } from "~/client/services/auth"
import { update } from "~/client/services/user"
import { UserDto } from "~/types/api"
import { updateUserSchema, UpdateUserType } from "~/types/form"

interface PersonalInfoFormProps {
  user: UserDto
}

export function PersonalInfoForm({ user }: PersonalInfoFormProps) {
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user.username,
      email: user.email
    }
  })

  const { isLoading, mutate } = useCustomMutation(
    async (values: UpdateUserType) => await update(user.id, values),
    {
      onSuccess: async (data) => {
        toast.success(data.customMessage)
        await logout("updateEmail=success")
      }
    }
  )

  const handleSubmit = async (values: UpdateUserType) => {
    if (values.username === user.username && values.email === user.email) {
      toast.error("Aucune modification n'a été apportée.")
      return
    }

    mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="m-10 flex flex-col space-y-6 lg:w-3/4"
      >
        <h1 className="text-xl font-semibold">Modification des informations personnelles</h1>

        <p className="text-sm text-muted-foreground">
          Si votre email est modifié, vous serez déconnecté et un email de confirmation sera envoyé
          à votre nouvelle adresse email.
          <br />
          Veuillez cliquer sur le lien de confirmation dans cet email pour valider votre nouvelle
          adresse email.
          <br />
          Si vous ne recevez pas l&apos;email de confirmation, veuillez vérifier votre dossier de
          spam ou de courrier indésirable.
        </p>

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

        <Button type="submit" disabled={isLoading}>
          {isLoading && <LoaderCircleIcon className="-ms-1 animate-spin" size={16} />}
          Mettre à jour
        </Button>
      </form>
    </Form>
  )
}
