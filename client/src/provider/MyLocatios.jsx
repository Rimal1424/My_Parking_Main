import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

const MyLocatios = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, location: null });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Fetch locations on mount
  useEffect(() => {
    const fetchMyLocations = async () => {
      try {
        const response = await api.get('/parkingLocations/getlocations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching your parking locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyLocations();
  }, [token]);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await api.delete(`/parkingLocations/deletelocations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(locations.filter((loc) => loc._id !== id));
      setDeleteModal({ show: false, location: null });
    } catch (error) {
      console.error("Error deleting location:", error);
      alert("Failed to delete location");
    }
  };

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-600 bg-green-100';
    if (percentage > 20) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const LocationCard = ({ loc }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white truncate">{loc.name}</h3>
                <p className="text-xs text-indigo-100 mt-1">ID: {loc._id?.slice(-8)}</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2 text-indigo-100 text-sm mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-2">{loc.address}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        {/* Pricing & Slots Section */}
        <div className="space-y-3">
          {/* 2-Wheeler */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-bold text-gray-900">Two Wheeler</span>
              </div>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                ₹{loc.pricing["2-wheeler"]}/hr
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 font-medium">Available Slots</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getAvailabilityColor(loc.slots["2-wheeler"].available, loc.slots["2-wheeler"].total)}`}>
                {loc.slots["2-wheeler"].available}/{loc.slots["2-wheeler"].total}
              </span>
            </div>
          </div>

          {/* 4-Wheeler */}
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <span className="font-bold text-gray-900">Four Wheeler</span>
              </div>
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                ₹{loc.pricing["4-wheeler"]}/hr
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 font-medium">Available Slots</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getAvailabilityColor(loc.slots["4-wheeler"].available, loc.slots["4-wheeler"].total)}`}>
                {loc.slots["4-wheeler"].available}/{loc.slots["4-wheeler"].total}
              </span>
            </div>
          </div>
        </div>

        {/* Coordinates */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="text-xs font-semibold text-gray-600 uppercase">GPS Coordinates</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 font-mono">
            <span>{loc.location.coordinates[1].toFixed(6)}</span>
            <span className="text-gray-400">•</span>
            <span>{loc.location.coordinates[0].toFixed(6)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => navigate(`/provider/edit-parking`, { state: { locationData: loc } })}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => setDeleteModal({ show: true, location: loc })}
            className="flex-1 bg-white border-2 border-red-500 text-red-600 py-3 rounded-xl shadow-md hover:bg-red-50 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-xl font-semibold">Loading your locations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Parking Locations</h1>
            <p className="text-gray-600">Manage and monitor all your parking spaces</p>
          </div>
          <Link to="/provider/add-parking">
            <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center gap-2 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Location
            </button>
          </Link>
        </div>

        {/* Statistics Cards */}
        {locations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Locations</p>
                  <p className="text-3xl font-bold text-gray-900">{locations.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">2W Slots</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {locations.reduce((acc, loc) => acc + loc.slots["2-wheeler"].total, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">4W Slots</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {locations.reduce((acc, loc) => acc + loc.slots["4-wheeler"].total, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Locations Grid */}
        {locations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Parking Locations Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start growing your parking business by adding your first parking location. It only takes a few minutes!
            </p>
            <Link to="/provider/add-parking">
              <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center gap-2 font-semibold mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Your First Location
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <LocationCard key={loc._id} loc={loc} />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete <strong className="text-gray-900">{deleteModal.location?.name}</strong>?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="text-sm text-red-800">
                    <p className="font-semibold mb-1">This action cannot be undone!</p>
                    <p>All associated bookings and data will be permanently removed.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(deleteModal.location._id)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteModal({ show: false, location: null })}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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

export default MyLocatios;
