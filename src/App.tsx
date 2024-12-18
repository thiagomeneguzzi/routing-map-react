import {useEffect} from "react";

import {MapContainer, TileLayer, useMap, useMapEvents} from "react-leaflet";
import L from "leaflet";

import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

type Position = {
    lat: number;
    lng: number;
};

const Routing = ({ start, end }: { start: Position; end: Position }) => {
    const map = useMap();

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        },
    });

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(start.lat, start.lng),
                L.latLng(end.lat, end.lng),
            ],
            routeWhileDragging: true, // Allows dragging the route dynamically
        }).addTo(map);

        return () => map.removeControl(routingControl); // Cleanup on unmount
    }, [map, start, end]);

    return null;
};

const MapWithRoute = () => {
    const start = { lat: -5.127704722844463, lng: -37.02555656433106 };
    const end = { lat: -5.010597986476896, lng: -36.93927526474 };

    return (
        <MapContainer
            center={start} // Initial map center
            zoom={14}      // Map zoom level
            style={{ height: "100vh", width: "100%" }} // Fullscreen map
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
             Routing Control
            <Routing start={start} end={end} />
        </MapContainer>
    );
};

function App() {
  return (
      <MapWithRoute />
  )
}

export default App
