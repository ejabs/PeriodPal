import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map"; // Ensure Map component can accept markers
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocatorPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  // Function to get user's current location
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchNearbyHospitals(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to fetch nearby hospitals using Google Places API
  const fetchNearbyHospitals = async (lat, lng) => {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY; // Use API key from .env
    const radius = 5000; // 5km range
    const type = "hospital";

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        const hospitalList = data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity,
          location: place.geometry.location,
          rating: place.rating || "N/A",
          distance: "Calculating...", // You can refine this with a distance function
        }));

        setHospitals(hospitalList);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="pt-6 pb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-4">
            Healthcare Locator
          </h1>
          <p className="text-muted-foreground">
            Find nearby hospitals and clinics for your healthcare needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card">
              <h3 className="text-lg font-semibold mb-4">Find Healthcare</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    type="text"
                    placeholder="Search hospitals, clinics..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={fetchUserLocation}>
                  <MapPin className="mr-2 h-4 w-4" />
                  Use Current Location
                </Button>
              </div>
            </div>
          </div>

          {/* Map & Results */}
          <div className="lg:col-span-2 space-y-6">
            <Map userLocation={userLocation} hospitals={hospitals} />

            <div className="glass-card">
              <h3 className="text-lg font-semibold">Nearby Locations</h3>
              <div className="space-y-4">
                {hospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="border border-muted rounded-lg p-4"
                  >
                    <h4 className="font-medium">{hospital.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {hospital.address}
                    </p>
                    <p className="text-sm">⭐ {hospital.rating}</p>
                  </div>
                ))}

                {hospitals.length === 0 && (
                  <div className="text-center py-8">
                    <h4 className="font-medium">No results found</h4>
                    <p className="text-sm text-muted-foreground">
                      Try enabling location services
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocatorPage;
