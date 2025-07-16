import { LatLng } from "leaflet"
import { lazy, Suspense } from "react"

import { Button } from "~/client/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/client/components/ui/dialog"
import { ClientOnly } from "~/client/components/utils/ClientOnly"

const LazyImported = lazy(() => import("~/client/components/hunt/Map"))

interface MapProps {
  title?: string
  position: LatLng | null
  setPosition: (pos: LatLng) => void
}
export function DialogMap({ title = "Ajouter un coffre", position, setPosition }: MapProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-lg bg-brown px-4 py-2 text-sm text-white md:w-1/3">
        {title}
      </DialogTrigger>
      <DialogContent className="max-w-1/ h-5/6" aria-describedby={undefined}>
        <DialogHeader className="flex flex-col gap-4 text-left">
          <DialogTitle>Ajouter un coffre</DialogTitle>

          <ClientOnly>
            <Suspense fallback="">
              <LazyImported position={position} setPosition={setPosition} />

              <DialogClose asChild>
                <Button className="mx-auto w-fit px-12">Confirm</Button>
              </DialogClose>
            </Suspense>
          </ClientOnly>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
