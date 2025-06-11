import type { LatLng } from "leaflet"
import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import { person, treasureIcon } from "~/icon/Icon"

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null)

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    }
  })

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    })
  }, [map])

  return (
    position && (
      <Marker position={position} icon={person}>
        <Popup>You are here</Popup>
      </Marker>
    )
  )
}

function ClickMarker({ onClick }: { onClick: (pos: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng)
    }
  })

  return null
}

interface MapProps {
  position: LatLng | null
  setPosition: (pos: LatLng) => void
}

export default function Map({ position, setPosition }: MapProps) {
  return (
    <MapContainer
      style={{
        height: "100%",
        width: "100%"
      }}
      center={[48.866667, 2.333333]}
      zoom={10}
      worldCopyJump={true}
      maxBounds={[
        [-85, -180],
        [85, 180]
      ]}
      minZoom={2.5}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker />

      <ClickMarker onClick={setPosition} />

      {position && (
        <Marker position={position} icon={treasureIcon}>
          <Popup>You put the treasure here</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
