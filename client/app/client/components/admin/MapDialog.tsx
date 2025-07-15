import { lazy, Suspense } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/client/components/ui/dialog"
import { ClientOnly } from "../utils/ClientOnly"

interface MapDialogProps {
  latitude: number
  longitude: number
}
export function MapDialog({ latitude, longitude }: MapDialogProps) {
  const LazyImported = lazy(() => import("~/client/components/MapContainer"))

  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-lg bg-brown py-1 text-sm text-white">
        Voir la carte
      </DialogTrigger>
      <DialogContent className="max-w-96 rounded-xl" aria-describedby={undefined}>
        <DialogHeader className="flex flex-col gap-4 text-left">
          <DialogTitle>Détails de la carte</DialogTitle>

          <ClientOnly>
            <Suspense fallback="Loading map...">
              <div className="z-10 overflow-hidden rounded-lg border border-gray-300 shadow-md">
                <LazyImported center={[latitude, longitude]} />
              </div>
            </Suspense>
          </ClientOnly>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
