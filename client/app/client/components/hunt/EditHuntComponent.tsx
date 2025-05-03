import { useCustomQuery } from "~/client/hook/useCustomMutation"
import { getHunt } from "~/client/services/hunt"
import CardWrapper from "../CardWrapper"
import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { EditHuntForm } from "./EditHuntForm"

interface EditHuntComponentProps {
  slug: string
  email: string
}

export function EditHuntComponent({ slug, email }: EditHuntComponentProps) {
  const { isLoading, data } = useCustomQuery(["hunts", slug], () => getHunt(slug))

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Skeleton className="mr-4 h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-12 w-full max-w-md" />
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Skeleton className="h-10 w-full md:col-span-2" />
                <Skeleton className="h-32 w-full md:col-span-2" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full md:col-span-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-full">
        <CardWrapper className="text-center">
          <p>Chasse introuvable.</p>
        </CardWrapper>
      </div>
    )
  }

  return <EditHuntForm hunt={data} email={email} />
}
