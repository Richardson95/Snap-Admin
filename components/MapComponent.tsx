'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })
}

interface MapComponentProps {
  mapKey?: string
}

export default function MapComponent({ mapKey }: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false)
  const pickupPosition: [number, number] = [6.5244, 3.3792] // Lagos coordinates
  const deliveryPosition: [number, number] = [6.4281, 3.4219]
  const route: [number, number][] = [pickupPosition, deliveryPosition]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading map...</p>
      </div>
    )
  }

  return (
    <MapContainer
      key={mapKey || 'map'}
      center={pickupPosition}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={pickupPosition}>
        <Popup>Pickup Location</Popup>
      </Marker>
      <Marker position={deliveryPosition}>
        <Popup>Delivery Location</Popup>
      </Marker>
      <Polyline positions={route} color="red" weight={3} />
    </MapContainer>
  )
}
