import { useNavigate } from "@remix-run/react"
import { useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { LatLng } from "leaflet"
import { CalendarIcon, LoaderCircleIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { DialogMap } from "~/client/components/hunt/DialogMap"
import { Button } from "~/client/components/ui/button"
import { Calendar } from "~/client/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/client/components/ui/form"
import { Input } from "~/client/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "~/client/components/ui/popover"
import { Switch } from "~/client/components/ui/switch"
import { Textarea } from "~/client/components/ui/textarea"
import { useCustomMutation } from "~/client/hook/useCustomMutation"
import routes from "~/client/routes"
import { createHunt } from "~/client/services/hunt"
import { cn } from "~/lib/utils"
import { HuntDto } from "~/types/api"
import { huntDraftSchema, huntFormSchema, HuntType } from "~/types/form"
import { UserPayload } from "~/types/user"

interface CreatHuntFormProps {
  user: UserPayload
}

export function CreatHuntForm({ user }: CreatHuntFormProps) {
  const [position, setPosition] = useState<LatLng | null>(null)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const form = useForm<HuntType>({
    defaultValues: {
      name: "",
      description: "",
      privateHunt: false,
      draft: false
    }
  })

  const { isLoading, mutate } = useCustomMutation(
    async (values: HuntDto) => await createHunt(values, user.sub),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: ["hunts"], exact: true })
        navigate(routes.hunts.list)
        toast.success(data?.customMessage)
      }
    }
  )

  const handleSubmit = async (values: HuntType) => {
    const isDraft = values.draft

    const schemaToUse = isDraft ? huntDraftSchema : huntFormSchema
    const result = schemaToUse.safeParse(values)

    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(err.message)
      })
      return
    }

    if (!isDraft && !position) {
      toast.error("La position du coffre est requise !")
      return
    }

    const huntWithLocation: HuntDto = {
      ...values,
      slug: values.name.trim().toLowerCase().replace(/\s+/g, "-"),
      latitude: position?.lat ?? 0,
      longitude: position?.lng ?? 0
    }

    mutate(huntWithLocation)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex h-full w-full flex-col justify-center space-y-6 lg:w-3/4"
      >
        <h1 className="text-center text-4xl font-bold">Créer une chasse</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la chasse</FormLabel>
              <FormControl>
                <Input placeholder="Entrez un nom de chasse" {...field} maxLength={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description de la chasse</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-96"
                  placeholder="Entrez une description"
                  {...field}
                  maxLength={20}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Date debut</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span className="truncate">Ajoutez une date de début</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Date de fin</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span className="truncate">Ajoutez une date de fin</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < form.getValues().startDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="privateHunt"
            render={({ field }) => (
              <FormItem className="flex w-fit flex-row items-center justify-between gap-10 rounded-lg py-4">
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel htmlFor="airplane-mode">
                    {field.value ? " Privée" : " Publique"}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="draft"
            render={({ field }) => (
              <FormItem className="flex w-fit flex-row items-center justify-between gap-10 rounded-lg py-4">
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel htmlFor="airplane-mode">Brouillon</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col items-center justify-end gap-2 md:flex-row">
          <DialogMap position={position} setPosition={setPosition} />
          <Button type="submit" className="w-full disabled:italic md:w-1/3" disabled={isLoading}>
            {isLoading && <LoaderCircleIcon className="-ms-1 animate-spin" size={16} />}
            {form.getValues().draft ? "Créer le brouillon" : "Créer la chasse"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
