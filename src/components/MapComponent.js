import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const MapComponent = () => {
    return (
        <MapContainer center={[9.9333, -84.0833]} zoom={8} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
        </MapContainer>
    );
};

export default MapComponent;
