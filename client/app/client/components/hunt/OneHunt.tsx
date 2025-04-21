import { lazy, Suspense } from "react"
import { useCustomQuery } from "~/client/hook/useCustomMutation"
import { getHunt } from "~/client/services/hunt"
import CardWrapper from "../CardWrapper"
import { BackButton } from "../utils/BackButton"
import { ClientOnly } from "../utils/ClientOnly"
import Spinner from "../utils/Spinner"

interface OneHuntProps {
  slug: string
}

const LazyImported = lazy(() => import("~/client/components/MapContainer"))

export function OneHunt({ slug }: OneHuntProps) {
  const { isLoading, data } = useCustomQuery(["hunts", slug], () => getHunt(slug))

  if (isLoading) return <Spinner />

  if (!data) {
    return (
      <div className="flex h-full">
        <CardWrapper className="text-center">
          <p>Chasse introuvable.</p>
        </CardWrapper>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-2 p-6 lg:w-3/4">
      <BackButton />
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <p className="text-sm text-gray-500">
        {data.privateHunt ? "Chasse privée" : "Chasse publique"}
      </p>

      <p>{data.description || "Pas de description fournie."}</p>

      <p>
        {new Date(data.startDate).toLocaleDateString("fr-FR")} -{" "}
        {new Date(data.endDate).toLocaleDateString("fr-FR")}
      </p>
      {data.draft && data.latitude === 0 && data.longitude === 0 ? (
        <p className="text-red-500">
          La chasse est en mode brouillon et n&apos;a pas encore de localisation.
        </p>
      ) : (
        <ClientOnly>
          <Suspense fallback="Loading map...">
            <div className="z-10 overflow-hidden rounded-lg border border-gray-300 shadow-md">
              <LazyImported center={[data.latitude, data.longitude]} />
            </div>
          </Suspense>
        </ClientOnly>
      )}
    </div>
  )
}
