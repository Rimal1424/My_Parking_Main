import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import api from "../../api";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

const Nearbylocations = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);

  const userIcon = L.divIcon({
    className: "custom-user-icon",
    html: '<div style="width: 24px; height: 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  const parkingIcon = L.divIcon({
    className: "custom-parking-icon",
    html: '<div style="width: 32px; height: 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 8px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">P</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const token = localStorage.getItem("token");
  const [SavedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/auth/get-saved-locations?token=${token}`);
        setSavedLocations(response.data);
      } catch (error) {
        console.error("Error fetching saved locations:", error);
      }
    };

    if (token) fetchSavedLocations();
  }, [token]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLocationError(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocationError(true);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationError(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchNearbyParking(userLocation.lat, userLocation.lng);
    }
  }, [userLocation]);

  const fetchNearbyParking = async (lat, lng) => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await api.get(`parkingLocations/nearbyparking?lat=${lat}&lng=${lng}&token=${token}`);
      setParkingSpots(response.data);
    } catch (error) {
      console.error("Error fetching parking locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setUserLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Nearby Parking Locations</h1>
          <p className="text-gray-600 text-lg">Discover available parking spots around you</p>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Interactive Map</h2>
                  <p className="text-indigo-100 text-sm">Click or drag the marker to update location</p>
                </div>
              </div>
              {userLocation && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-white text-sm font-semibold">
                    📍 Lat: {userLocation.lat.toFixed(4)}, Lng: {userLocation.lng.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {locationError ? (
            <div className="p-12 text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Location Access Required</h3>
              <p className="text-gray-600 mb-4">Please enable location services to find nearby parking spots</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Retry
              </button>
            </div>
          ) : userLocation ? (
            <div className="relative">
              <MapContainer 
                center={[userLocation.lat, userLocation.lng]} 
                zoom={13} 
                className="h-96 w-full"
                style={{ zIndex: 0 }}
              >
                <TileLayer 
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapClickHandler />

                <Marker
                  position={[userLocation.lat, userLocation.lng]}
                  icon={userIcon}
                  draggable={true}
                  eventHandlers={{
                    dragend: (e) => {
                      const { lat, lng } = e.target.getLatLng();
                      setUserLocation({ lat, lng });
                    },
                  }}
                >
                  <Popup>
                    <div className="text-center">
                      <p className="font-bold text-indigo-600 mb-1">Your Location</p>
                      <p className="text-xs text-gray-600">Drag marker or click map to update</p>
                    </div>
                  </Popup>
                </Marker>

                {parkingSpots.map((spot, index) => (
                  <Marker 
                    key={index} 
                    position={[spot.location.coordinates[1], spot.location.coordinates[0]]}
                    icon={parkingIcon}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <h3 className="font-bold text-gray-900 mb-2">{spot.name}</h3>
                        <p className="text-xs text-gray-600 mb-3">{spot.address}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">2-Wheeler:</span>
                            <span className="font-bold text-emerald-600">
                              {spot.pricing["2-wheeler"] ? `₹${spot.pricing["2-wheeler"]}/hr` : "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">4-Wheeler:</span>
                            <span className="font-bold text-emerald-600">
                              {spot.pricing["4-wheeler"] ? `₹${spot.pricing["4-wheeler"]}/hr` : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              
              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 z-[1000]">
                <p className="text-xs font-bold text-gray-700 mb-2">Map Legend</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}></div>
                    <span className="text-xs text-gray-600">Your Location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}></div>
                    <span className="text-xs text-gray-600">Parking Spots</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600 text-lg font-semibold">Fetching your location...</p>
            </div>
          )}
        </div>

        {/* Results Header */}
        {!loading && parkingSpots.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{parkingSpots.length} Parking Spots Found</p>
                  <p className="text-sm text-gray-600">Within your vicinity</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600 text-lg font-semibold">Loading nearby parking spots...</p>
          </div>
        )}

        {/* Parking Cards Grid */}
        {!loading && parkingSpots.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {parkingSpots.map((spot, index) => (
              <ParkingCard key={index} {...spot} SavedLocations={SavedLocations} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && parkingSpots.length === 0 && !locationError && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Parking Spots Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any parking locations near you. Try adjusting your location on the map.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ParkingCard = ({ _id, name, address, pricing, slots, SavedLocations }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsSaved(SavedLocations.some((saved) => saved._id === _id));
  }, [SavedLocations, _id]);

  const handleSave = async () => {
    if (!token) {
      alert("You must be logged in to save a location.");
      return;
    }

    setActionLoading(true);
    try {
      const response = await api.post(
        "/auth/save-location",
        { parkingId: _id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if ([200, 201].includes(response.status)) {
        setIsSaved(true);
      } else {
        alert("Failed to save location. Please try again.");
      }
    } catch (error) {
      console.error("Error saving location:", error);
      alert(error.response?.data?.message || "Error saving location.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemove = async () => {
    setActionLoading(true);
    try {
      await api.delete(`/auth/remove-saved-location/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsSaved(false);
    } catch (error) {
      console.error("Error removing saved location:", error);
      alert("Error removing saved location.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleBookNow = () => {
    navigate("/user/book-parking", { state: { parkingId: _id, parkingName: name, pricing: pricing || {} } });
  };

  const twoWheelerAvailable = slots?.["2-wheeler"]?.available || 0;
  const fourWheelerAvailable = slots?.["4-wheeler"]?.available || 0;
  const totalAvailable = twoWheelerAvailable + fourWheelerAvailable;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-white text-lg leading-tight pr-2">{name}</h3>
            {totalAvailable > 0 ? (
              <span className="bg-green-400 text-green-900 px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0">
                Available
              </span>
            ) : (
              <span className="bg-red-400 text-red-900 px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0">
                Full
              </span>
            )}
          </div>
          <p className="text-sm text-emerald-50 line-clamp-2">{address}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        {/* Pricing Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Hourly Rates</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-500 p-1.5 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">2-Wheeler</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {pricing?.["2-wheeler"] ? `₹${pricing["2-wheeler"]}` : "N/A"}
                <span className="text-xs text-gray-500">/hr</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-500 p-1.5 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">4-Wheeler</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {pricing?.["4-wheeler"] ? `₹${pricing["4-wheeler"]}` : "N/A"}
                <span className="text-xs text-gray-500">/hr</span>
              </span>
            </div>
          </div>
        </div>

        {/* Availability Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Available Slots</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{twoWheelerAvailable}</p>
              <p className="text-xs text-gray-600">2W Slots</p>
            </div>
            <div className="w-px h-10 bg-purple-200"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">{fourWheelerAvailable}</p>
              <p className="text-xs text-gray-600">4W Slots</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {isSaved ? (
            <button
              onClick={handleRemove}
              disabled={actionLoading}
              className="flex-1 bg-white border-2 border-red-500 text-red-600 py-3 rounded-xl shadow-md hover:bg-red-50 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
            >
              {actionLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Remove
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={actionLoading}
              className="flex-1 bg-white border-2 border-emerald-500 text-emerald-600 py-3 rounded-xl shadow-md hover:bg-emerald-50 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
            >
              {actionLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-600 border-t-transparent"></div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Save
                </>
              )}
            </button>
          )}

          <button
            onClick={handleBookNow}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center gap-2 font-bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nearbylocations;
