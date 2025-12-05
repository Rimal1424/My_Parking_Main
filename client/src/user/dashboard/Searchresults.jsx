import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

export const SearchResults = ({ results }) => {
  const token = localStorage.getItem("token");
  const [SavedLocations, setSavedLocations] = useState([]);
  const [mapView, setMapView] = useState(true);

  const parkingIcon = L.divIcon({
    className: "custom-parking-icon",
    html: '<div style="width: 32px; height: 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 8px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">P</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

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

  if (!results || results.length === 0) {
    return (
      <div className="mt-8 mx-4 md:mx-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Parking Locations Found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn't find any parking spots matching your search. Try adjusting your search terms or location.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 mx-4 md:mx-8">
      {/* Results Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Search Results</h2>
              <p className="text-emerald-100 text-sm">
                Found {results.length} parking spot{results.length !== 1 ? 's' : ''} matching your search
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-1">
              <button
                onClick={() => setMapView(true)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  mapView 
                    ? "bg-white text-emerald-600 shadow-md" 
                    : "text-white hover:bg-white/20"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Map
              </button>
              <button
                onClick={() => setMapView(false)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  !mapView 
                    ? "bg-white text-emerald-600 shadow-md" 
                    : "text-white hover:bg-white/20"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                List
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="px-8 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-emerald-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-500 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Locations</p>
                  <p className="text-lg font-bold text-gray-900">{results.length}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-emerald-200"></div>
              <div className="flex items-center gap-2">
                <div className="bg-teal-500 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Available Now</p>
                  <p className="text-lg font-bold text-gray-900">
                    {results.filter(r => (r.slots?.["2-wheeler"]?.available || 0) + (r.slots?.["4-wheeler"]?.available || 0) > 0).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map View */}
      {mapView && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Map View</h3>
            </div>
          </div>
          <div className="relative">
            <MapContainer
              center={[results[0]?.location.coordinates[1], results[0]?.location.coordinates[0]]}
              zoom={14}
              className="w-full h-96"
              style={{ zIndex: 0 }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {results.map((parking, index) => (
                <Marker
                  key={index}
                  position={[parking.location.coordinates[1], parking.location.coordinates[0]]}
                  icon={parkingIcon}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <h3 className="font-bold text-gray-900 mb-2">{parking.name}</h3>
                      <p className="text-xs text-gray-600 mb-3">{parking.address}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">2-Wheeler:</span>
                          <span className="font-bold text-emerald-600">
                            {parking.pricing?.["2-wheeler"] ? `₹${parking.pricing["2-wheeler"]}/hr` : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">4-Wheeler:</span>
                          <span className="font-bold text-emerald-600">
                            {parking.pricing?.["4-wheeler"] ? `₹${parking.pricing["4-wheeler"]}/hr` : "N/A"}
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
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}></div>
                <span className="text-xs text-gray-600">Parking Locations</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Grid */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">All Results</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((parking, index) => (
              <ParkingCard key={index} {...parking} SavedLocations={SavedLocations} />
            ))}
          </div>
        </div>
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

export default SearchResults;
