import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import 'leaflet/dist/leaflet.css';

/* Custom marker icon */
const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function TrackParcel() {
    /* Initial position */
    const [position, setPosition] = useState([23.8103, 90.4125]);
    const pickup = [23.8103, 90.4125];
    const delivery = [23.7806, 90.2792];

    /* Simulate real-time movement */
    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prev) => [
                prev[0] + 0.0001,
                prev[1] + 0.0002,
            ]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white fw-bold">🗺️ Real-Time Parcel Tracking</div>
                        <div className="card-body">
                            <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&copy; OpenStreetMap contributors"
                                />
                                <Marker position={pickup} icon={markerIcon}>
                                    <Popup>📍 Pickup Location</Popup>
                                </Marker>
                                <Marker position={delivery} icon={markerIcon}>
                                    <Popup>🏁 Delivery Location</Popup>
                                </Marker>
                                <Marker position={position} icon={markerIcon}>
                                    <Popup>🚚 Parcel is here</Popup>
                                </Marker>
                                <Polyline positions={[pickup, position, delivery]} color="blue" />
                            </MapContainer>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default TrackParcel;
