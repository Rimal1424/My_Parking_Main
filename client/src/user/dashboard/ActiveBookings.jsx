import { useState, useEffect } from "react";
import api from "../../api";

const ActiveBookings = ({ setactivebookingNumber }) => {
  const [activeBookings, setActiveBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelModal, setCancelModal] = useState({ show: false, booking: null });

  useEffect(() => {
    const fetchActiveBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view active bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/bookings/getbookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const active = response.data.filter((booking) => booking.status === "active");
          setActiveBookings(active);
          setactivebookingNumber(active.length);
        } else {
          setError("Failed to fetch active bookings.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching active bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveBookings();
  }, [setactivebookingNumber]);

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await api.delete(
        `/bookings/cancle-bookings/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const updatedBookings = activeBookings.filter((booking) => booking._id !== bookingId);
        setActiveBookings(updatedBookings);
        setactivebookingNumber(updatedBookings.length);
        setCancelModal({ show: false, booking: null });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error canceling booking.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-xl font-semibold">Loading active bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 max-w-md text-center">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Active Bookings</h1>
              <p className="text-gray-600">Your current parking reservations</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Active Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{activeBookings.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {activeBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white truncate">{booking.parkingId.name}</h3>
                          <p className="text-xs text-blue-100 truncate">{booking.parkingId.address}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-400 text-green-900 rounded-full text-xs font-bold uppercase flex-shrink-0 ml-2">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Vehicle Info */}
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-purple-500 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-600 uppercase">Vehicle</p>
                        <p className="font-bold text-gray-900 capitalize">{booking.vehicleType}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 font-mono font-semibold pl-11">{booking.vehicleNumber}</p>
                  </div>

                  {/* Time Details */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Duration</p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Start:</span> {new Date(booking.startTime).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">End:</span> {new Date(booking.endTime).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                        </p>
                      </div>
                    </div>

                    {/* Pricing Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-600 font-medium">Hourly Rate</p>
                        <p className="text-sm font-semibold text-gray-900">₹{booking.parkingId.pricing[booking.vehicleType]}/hr</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600 font-medium">Total Paid</p>
                        <p className="text-2xl font-bold text-emerald-600">₹{booking.pricePaid}</p>
                      </div>
                    </div>
                  </div>

                  {/* Cancel Button */}
                  <button
                    onClick={() => setCancelModal({ show: true, booking })}
                    className="w-full bg-white border-2 border-red-500 text-red-600 py-3 rounded-xl shadow-md hover:bg-red-50 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Active Bookings</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You don't have any active parking sessions at the moment. Book a parking spot to get started!
            </p>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModal.show && (
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
                <h3 className="text-xl font-bold text-white">Cancel Booking</h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to cancel your booking at{" "}
                <strong className="text-gray-900">{cancelModal.booking?.parkingId.name}</strong>?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="text-sm text-red-800">
                    <p className="font-semibold mb-1">Important Information</p>
                    <p>Cancellation policies may apply. Please check the refund terms before proceeding.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleCancelBooking(cancelModal.booking._id)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Yes, Cancel
                </button>
                <button
                  onClick={() => setCancelModal({ show: false, booking: null })}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Go Back
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

export default ActiveBookings;
