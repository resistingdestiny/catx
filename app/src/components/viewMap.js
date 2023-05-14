import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet'; // you'll need to import Leaflet to create a new DivIcon
import axios from 'axios';
import { useMap } from 'react-leaflet';

export default function MapComponent(props) {
  const [center, setCenter] = useState([51.505, -0.09]);
  const [radius, setRadius] = useState(20000);
  const [what3words, setWhat3words] = useState("");
  const [radiusInKm, setRadiusInKm] = useState(radius / 1000);  
  const [markerPos, setMarkerPos] = useState(null); // holds the position of the marker
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  

  const catIcon = new L.DivIcon({
    className: "custom-icon",
    html: "😺", 
    iconSize: [30, 30], 
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('test', props.what3words.whatThreeWords)
        const response = await axios.get(`https://api.what3words.com/v3/convert-to-coordinates?words=${props.what3words.whatThreeWords}&key=NABAUHO2`);
        console.log(response)
        setCenter([response.data.coordinates.lat, response.data.coordinates.lng]);
      } catch (error) {
        console.error("Error fetching coordinates data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer center={center} zoom={9} style={{ height: "200px", width: "100%" }}>
       <ChangeView center={center} zoom={9} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    
      <Circle center={center} radius={radius} />
      {markerPos && <Marker position={markerPos} icon={catIcon} />} 
    </MapContainer>
  );
}
