import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ======================
// CLICK MAP
// ======================
function MapClick({ onSelect, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      if (onSelect) onSelect(e.latlng);
    },
  });
  return null;
}

// ======================
// FLY TO LOCATION
// ======================
function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 16);
    }
  }, [position]);

  return null;
}

// ======================
// MAIN MAP
// ======================
function MapPicker({ onSelect, savedAddresses, selectedPosition }) {
  const [position, setPosition] = useState(null);

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <MapContainer
        center={[10.7769, 106.7009]}
        zoom={13}
        style={{ height: "700px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <MapClick onSelect={onSelect} setPosition={setPosition} />

        <FlyToLocation position={selectedPosition} />

        {/* Marker click */}
        {position && <Marker position={position} />}

        {/* Marker từ DB */}
        {(savedAddresses || []).map((addr) => (
          <Marker
            key={addr.id}
            position={{ lat: addr.latitude, lng: addr.longitude }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default MapPicker;