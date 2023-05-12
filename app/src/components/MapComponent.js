import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, useMapEvents } from 'react-leaflet';
import { useEffect } from "react";
export default function MapComponent() {
  const [center, setCenter] = useState([51.505, -0.09]);
  const [radius, setRadius] = useState(1000);

  function MapEvents() {
    const map = useMapEvents({
        click: (e) => {
          setRadius((prevRadius) => prevRadius + 100); 
          setCenter(e.latlng);
        },
        contextmenu: (e) => {
          setRadius((prevRadius) => Math.max(prevRadius - 100, 100));  
        },
      });
  
    useEffect(() => {
        setTimeout(() => {
          map.invalidateSize();
        }, 500); 
      }, [map]);
  
    return null;
  }
  

  return (
    <MapContainer center={center} zoom={13} style={{ height: "300px", width: "100%" }}>
      <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
      <Circle center={center} radius={radius} />
    </MapContainer>
  );
}
