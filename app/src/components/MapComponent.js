import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet'; // you'll need to import Leaflet to create a new DivIcon
import axios from 'axios';

export default function MapComponent(props) {
  const [center, setCenter] = useState([51.505, -0.09]);
  const [radius, setRadius] = useState(20000);
  const [what3words, setWhat3words] = useState("");
  const [radiusInKm, setRadiusInKm] = useState(radius / 1000);  
  const [markerPos, setMarkerPos] = useState(null); // holds the position of the marker

  function MapEvents() {
    const map = useMapEvents({
      click: async (e) => {
        const newRadius = radius + 1000; 
        setRadius(newRadius); 
        setRadiusInKm(newRadius / 1000); 
        setCenter(e.latlng);
        setMarkerPos(e.latlng); // set the marker position to the clicked location

        try {
          const response = await axios.get(`https://api.what3words.com/v3/convert-to-3wa?coordinates=${e.latlng.lat}%2C${e.latlng.lng}&key=2M2N96E7`);
          setWhat3words(response.data.words);
        } catch (error) {
          console.error("Error fetching what3words data", error);
        }
      },
      contextmenu: (e) => {
        const newRadius = Math.max(radius - 1000, 1000);
        setRadius(newRadius);  
        setRadiusInKm(newRadius / 1000);
      },
    });

    return null;
  }

  props.setRadiusInKm(radiusInKm);
  props.setWhat3Words(what3words);

  // create a new DivIcon instance with our custom HTML
  const catIcon = new L.DivIcon({
    className: "custom-icon", // optional, can be used for styling
    html: "😺", // this will be the marker icon
    iconSize: [30, 30], // size of the icon in pixels
  });

  return (
    <MapContainer center={center} zoom={9} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
      <Circle center={center} radius={radius} />
      {markerPos && <Marker position={markerPos} icon={catIcon} />} 
    </MapContainer>
  );
}
