import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { treasureIcon } from "~/icon/Icon"

interface MapContainerProps {
  center: [number, number]
}

export default function MapContainerComp({ center }: MapContainerProps) {
  return (
    <MapContainer
      style={{
        height: "300px",
        width: "100%"
      }}
      center={center}
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
      <Marker
        position={center} // Créer un objet LatLng
        icon={treasureIcon}
      >
        <Popup>You put the treasure here</Popup>
      </Marker>
    </MapContainer>
  )
}
