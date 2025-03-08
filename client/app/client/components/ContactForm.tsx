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
import { Textarea } from "~/client/components/ui/textarea"
import { useCustomMutation } from "~/client/hook/useCustomMutation"
import { contact } from "~/client/services/contact"
import { contactFormSchema, ContactFormType } from "~/types/form"

export function ContactForm() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  })

  const { isLoading, mutate } = useCustomMutation(
    async (values: ContactFormType) => await contact(values),
    {
      onSuccess: (data) => {
        toast.success(data.customMessage, {
          description: "Un message de confirmation a été envoyé à votre adresse email.",
          duration: 3000
        })
        form.reset()
      }
    }
  )

  const handleSubmit = (values: ContactFormType) => mutate(values)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto flex h-full w-2/3 flex-col justify-center space-y-6 lg:w-1/3"
      >
        <h1 className="text-center text-4xl font-bold">Contactez-nous</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Entrez votre nom" {...field} maxLength={20} />
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
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sujet</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le sujet" {...field} maxLength={50} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Entrez votre message" {...field} maxLength={200} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading && <LoaderCircleIcon className="-ms-1 animate-spin" size={16} />}
          Envoyer
        </Button>
      </form>
    </Form>
  )
}
