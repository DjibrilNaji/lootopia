import { Link, useNavigate } from "@remix-run/react"
import { useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ChevronLeft, Save } from "lucide-react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { LatLng } from "leaflet"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "~/client/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/client/components/ui/form"
import { Input } from "~/client/components/ui/input"
import { Switch } from "~/client/components/ui/switch"
import { Textarea } from "~/client/components/ui/textarea"
import { useCustomMutation } from "~/client/hook/useCustomMutation"
import routes from "~/client/routes"
import { updateHunt } from "~/client/services/hunt"
import { HuntDto } from "~/types/api"
import { Card, CardContent } from "../ui/card"
import { DatePicker } from "../utils/DatePicker"
import { DialogMap } from "./DialogMap"

const huntFormSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères" }),
  description: z.string().min(5, { message: "La description doit contenir au moins 5 caractères" }),
  latitude: z
    .number()
    .min(-90, { message: "La latitude doit être comprise entre -90 et 90" })
    .max(90, { message: "La latitude doit être comprise entre -90 et 90" }),
  longitude: z
    .number()
    .min(-180, { message: "La longitude doit être comprise entre -180 et 180" })
    .max(180, { message: "La longitude doit être comprise entre -180 et 180" }),
  startDate: z.date({ required_error: "La date de début est requise" }),
  endDate: z.date({ required_error: "La date de fin est requise" }),
  isPrivate: z.boolean().default(false)
})

type HuntFormValues = z.infer<typeof huntFormSchema>

interface EditHuntFormProps {
  hunt: HuntDto
  email: string
}

export function EditHuntForm({ hunt, email }: EditHuntFormProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [position, setPosition] = useState<LatLng | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then(({ LatLng }) => {
        if (hunt.latitude && hunt.longitude) {
          setPosition(new LatLng(hunt.latitude, hunt.longitude))
        }
      })
    }
  }, [hunt.latitude, hunt.longitude])
  const form = useForm<HuntFormValues>({
    resolver: zodResolver(huntFormSchema),
    defaultValues: {
      name: hunt.name,
      description: hunt.description,
      latitude: hunt.latitude,
      longitude: hunt.longitude,
      startDate: new Date(hunt.startDate),
      endDate: new Date(hunt.endDate),
      isPrivate: hunt.privateHunt
    }
  })

  const { isLoading, mutate } = useCustomMutation(
    async (values: HuntDto) => await updateHunt({ ...values, id: hunt.id }, email),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: ["hunts"], exact: true })
        await queryClient.invalidateQueries({ queryKey: ["hunts", hunt.slug], exact: true })
        navigate(routes.hunts.one(form.getValues().name.trim().toLowerCase().replace(/\s+/g, "-")))
        toast.success(data?.customMessage)
      }
    }
  )

  const handleSubmit = async (values: HuntFormValues) => {
    const huntWithLocation: HuntDto = {
      ...values,
      privateHunt: values.isPrivate,
      draft: false,
      slug: values.name.trim().toLowerCase().replace(/\s+/g, "-"),
      latitude: position?.lat ?? 0,
      longitude: position?.lng ?? 0
    }
    mutate(huntWithLocation)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex items-center">
          <Link to={routes.hunts.one(hunt.slug)} className="mr-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Modifier la chasse</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de la chasse</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Chasse au trésor de Paris" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Décrivez votre chasse au trésor..."
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de début</FormLabel>
                        <DatePicker date={field.value} setDate={field.onChange} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de fin</FormLabel>
                        <DatePicker date={field.value} setDate={field.onChange} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPrivate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {form.getValues().isPrivate ? "Chasse privée" : "Chasse publique"}
                          </FormLabel>
                          <FormDescription>
                            Rendre cette chasse visible pour tous les utilisateurs ou non
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2">
                    <DialogMap
                      position={position}
                      setPosition={setPosition}
                      title="Modifier la position coffre"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

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
      </motion.div>
    </div>
  )
}
