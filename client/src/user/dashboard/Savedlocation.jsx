import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import L from "leaflet";

const Savedlocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const [removeModal, setRemoveModal] = useState({ show: false, location: null });

  const userIcon = L.divIcon({
    className: "custom-user-icon",
    html: '<div style="width: 24px; height: 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  const savedIcon = L.divIcon({
    className: "custom-saved-icon",
    html: '<div style="width: 32px; height: 32px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 8px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">★</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

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
    const fetchSavedLocations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/auth/get-saved-locations?token=${token}`);
        setSavedLocations(response.data);
      } catch (error) {
        console.error("Error fetching saved locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedLocations();
  }, []);

  const removeSavedLocation = async (locationId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/auth/remove-saved-location/${locationId}?token=${token}`);
      setSavedLocations((prev) => prev.filter((location) => location._id !== locationId));
      setRemoveModal({ show: false, location: null });
    } catch (error) {
      console.error("Error removing saved location:", error);
      alert("Error removing saved location.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-3 rounded-xl shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Saved Locations</h1>
              <p className="text-gray-600 text-lg">Your favorite parking spots in one place</p>
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Favorites</p>
                <p className="text-4xl font-bold text-gray-900">{savedLocations.length}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl px-6 py-3 border border-yellow-200">
              <p className="text-sm text-gray-700">
                ⭐ Quick access to your most visited spots
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 px-8 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Saved Locations Map</h2>
                  <p className="text-yellow-100 text-sm">View all your favorite spots on the map</p>
                </div>
              </div>
              {userLocation && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-white text-sm font-semibold">
                    📍 {savedLocations.length} location{savedLocations.length !== 1 ? 's' : ''} saved
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
              <p className="text-gray-600 mb-4">Enable location services to view your saved spots on the map</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
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
                
                <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                  <Popup>
                    <div className="text-center">
                      <p className="font-bold text-indigo-600 mb-1">Your Location</p>
                      <p className="text-xs text-gray-600">Current position</p>
                    </div>
                  </Popup>
                </Marker>

                {savedLocations.map((location) => (
                  <Marker
                    key={location._id}
                    position={[
                      location.location.coordinates[1],
                      location.location.coordinates[0],
                    ]}
                    icon={savedIcon}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-500 text-lg">⭐</span>
                          <h3 className="font-bold text-gray-900">{location.name}</h3>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{location.address}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">2-Wheeler:</span>
                            <span className="font-bold text-emerald-600">
                              {location.pricing["2-wheeler"] ? `₹${location.pricing["2-wheeler"]}/hr` : "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">4-Wheeler:</span>
                            <span className="font-bold text-emerald-600">
                              {location.pricing["4-wheeler"] ? `₹${location.pricing["4-wheeler"]}/hr` : "N/A"}
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
                    <div className="w-4 h-4 rounded" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}></div>
                    <span className="text-xs text-gray-600">Saved Spots ⭐</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mb-4"></div>
              <p className="text-gray-600 text-lg font-semibold">Fetching your location...</p>
            </div>
          )}
        </div>

        {/* Saved Locations List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Your Favorites</h2>
                <p className="text-yellow-100 text-sm">Quick access to all saved parking locations</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mb-4"></div>
                <p className="text-gray-600 text-lg font-semibold">Loading saved locations...</p>
              </div>
            ) : savedLocations.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-yellow-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No Saved Locations</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  You haven't saved any parking locations yet. Explore nearby spots and save your favorites for quick access!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedLocations.map((location) => (
                  <SavedLocationCard
                    key={location._id}
                    locationData={location}
                    onRemove={() => setRemoveModal({ show: true, location })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Remove Confirmation Modal */}
      {removeModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
            <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Remove from Favorites</h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to remove{" "}
                <strong className="text-gray-900">{removeModal.location?.name}</strong> from your saved locations?
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <span className="text-yellow-600 text-xl flex-shrink-0">⭐</span>
                  <p className="text-sm text-gray-700">
                    You can always add it back to your favorites later from the search or nearby locations page.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => removeSavedLocation(removeModal.location._id)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold"
                >
                  Yes, Remove
                </button>
                <button
                  onClick={() => setRemoveModal({ show: false, location: null })}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

const SavedLocationCard = ({ locationData, onRemove }) => {
  const navigate = useNavigate();
  const { _id, name, address, pricing, slots } = locationData;

  const handleBookNow = () => {
    navigate("/user/book-parking", { 
      state: { parkingId: _id, parkingName: name, pricing: pricing || {} } 
    });
  };

  const twoWheelerAvailable = slots?.["2-wheeler"]?.available || 0;
  const fourWheelerAvailable = slots?.["4-wheeler"]?.available || 0;
  const totalAvailable = twoWheelerAvailable + fourWheelerAvailable;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Card Header with Star */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 px-6 py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-2xl flex-shrink-0">⭐</span>
              <h3 className="font-bold text-white text-lg leading-tight line-clamp-1">{name}</h3>
            </div>
            {totalAvailable > 0 ? (
              <span className="bg-green-400 text-green-900 px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0 ml-2">
                Available
              </span>
            ) : (
              <span className="bg-red-400 text-red-900 px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0 ml-2">
                Full
              </span>
            )}
          </div>
          <p className="text-sm text-yellow-50 line-clamp-2">{address}</p>
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
          <button
            onClick={onRemove}
            className="flex-1 bg-white border-2 border-red-500 text-red-600 py-3 rounded-xl shadow-md hover:bg-red-50 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove
          </button>

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

export default Savedlocation;
