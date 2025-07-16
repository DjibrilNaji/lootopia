import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"
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
import { update } from "~/client/services/user"
import { emailValidator, stringValidator } from "~/client/validators"
import { UserDto } from "~/types/api"
import { Button } from "../ui/button"

export const updateUserSchema = z
  .object({
    username: stringValidator.min(5, "Le nom d'utilisateur doit contenir au moins 5 caractères"),
    email: emailValidator
  })
  .required()

type UserFormValues = z.infer<typeof updateUserSchema>

interface EditUserFormProps {
  user: UserDto
}

export function EditUserForm({ user }: EditUserFormProps) {
  const queryClient = useQueryClient()

  const form = useForm<UserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user.username,
      email: user.email
    }
  })

  const { isLoading, mutate } = useCustomMutation(
    async (values: UserFormValues) => await update(user.id, values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"])
        toast.success("Mot de passe mis à jour avec succès.")
      }
    }
  )

  const handleSubmit = async (values: UserFormValues) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d&apos;utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Chasseur123" {...field} />
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
              <FormLabel>Adresse e-mail</FormLabel>
              <FormControl>
                <Input placeholder="Ex: chasseur123@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-8 flex flex-col justify-between gap-5 md:flex-row">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "Enregistrement..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les modifications
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
