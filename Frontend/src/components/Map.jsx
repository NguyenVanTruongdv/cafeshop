import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// CLICK MAP
function MapClick({ onSelect, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      if (onSelect) onSelect(e.latlng);
    },
  });
  return null;
}

// FLY TO LOCATION
function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 17);
    }
  }, [position]);

  return null;
}

// MAIN MAP
function MapPicker({
  onSelect,
  savedAddresses,
  selectedPosition,
  route,
  shopLocation,
}) {
  const [position, setPosition] = useState(null);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <MapContainer
        center={[10.7769, 106.7009]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <MapClick onSelect={onSelect} setPosition={setPosition} />
        <FlyToLocation position={selectedPosition} />

        {shopLocation && <Marker position={shopLocation} />}

        {/* Marker click */}
        {position && <Marker position={position} />}

        {/* Marker từ DB */}
        {(Array.isArray(savedAddresses) ? savedAddresses : []).map((addr) => (
          <Marker
            key={addr.id}
            position={{
              lat: Number(addr.latitude),
              lng: Number(addr.longitude),
            }}
          />
        ))}

       {route && route.coordinates && (
  <Polyline
    positions={route.coordinates.map((coord) => [coord[1], coord[0]])}
    pathOptions={{ color: "red", weight: 5 }}
  />
)}
      </MapContainer>
    </div>
  );
}

export default MapPicker;
