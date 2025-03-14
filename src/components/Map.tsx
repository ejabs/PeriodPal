import { useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const Map = ({ userLocation, hospitals }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={userLocation || { lat: 37.7749, lng: -122.4194 }} // Default to SF if no location
    >
      {/* User location marker */}
      {userLocation && <Marker position={userLocation} label="You" />}

      {/* Hospital markers */}
      {hospitals.map((hospital) => (
        <Marker
          key={hospital.id}
          position={hospital.location}
          label={hospital.name}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
