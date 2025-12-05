import { useState, useEffect } from "react";
import api from "../../api";

const ParkingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [cancelModal, setCancelModal] = useState({ show: false, booking: null });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        setError("You must be logged in to view bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/bookings/getbookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setBookings(response.data);
        } else {
          setError("Failed to fetch bookings.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  // Categorize bookings
  const activeBookings = bookings.filter((booking) => booking.status === "active");
  const completedBookings = bookings.filter((booking) => booking.status === "completed");
  const canceledBookings = bookings.filter((booking) => booking.status === "cancelled");

  const getFilteredBookings = () => {
    switch (activeTab) {
      case "active":
        return activeBookings;
      case "completed":
        return completedBookings;
      case "cancelled":
        return canceledBookings;
      default:
        return bookings;
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await api.delete(
        `/bookings/cancle-bookings/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setCancelModal({ show: false, booking: null });
        window.location.reload();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error canceling booking.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-xl font-semibold">Loading bookings...</p>
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

  const filteredBookings = getFilteredBookings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Booking History</h1>
          <p className="text-gray-600 text-lg">View and manage all your parking reservations</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-4 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total</p>
                <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Active</p>
                <p className="text-3xl font-bold text-blue-600">{activeBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-4 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Completed</p>
                <p className="text-3xl font-bold text-emerald-600">{completedBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Cancelled</p>
                <p className="text-3xl font-bold text-red-600">{canceledBookings.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {[
                { id: "all", label: "All Bookings", count: bookings.length },
                { id: "active", label: "Active", count: activeBookings.length },
                { id: "completed", label: "Completed", count: completedBookings.length },
                { id: "cancelled", label: "Cancelled", count: canceledBookings.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.label} <span className="ml-2 text-sm">({tab.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          <div className="p-6">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Bookings Found</h3>
                <p className="text-gray-600">You don't have any {activeTab !== "all" ? activeTab : ""} bookings yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookings.map((booking) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    onCancel={() => setCancelModal({ show: true, booking })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
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

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to cancel your booking at{" "}
                <strong className="text-gray-900">{cancelModal.booking?.parkingId.name}</strong>?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-red-800 font-medium">
                  ⚠️ This action cannot be undone. Please check the cancellation policy before proceeding.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleCancelBooking(cancelModal.booking._id)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => setCancelModal({ show: false, booking: null })}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Go Back
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

const BookingCard = ({ booking, onCancel }) => {
  const getStatusConfig = () => {
    switch (booking.status) {
      case "active":
        return {
          color: "from-blue-600 to-indigo-600",
          badge: "bg-blue-400 text-blue-900",
          borderColor: "border-blue-500",
        };
      case "completed":
        return {
          color: "from-emerald-600 to-teal-600",
          badge: "bg-emerald-400 text-emerald-900",
          borderColor: "border-emerald-500",
        };
      case "cancelled":
        return {
          color: "from-red-600 to-rose-600",
          badge: "bg-red-400 text-red-900",
          borderColor: "border-red-500",
        };
      default:
        return {
          color: "from-gray-600 to-gray-700",
          badge: "bg-gray-400 text-gray-900",
          borderColor: "border-gray-500",
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Card Header */}
      <div className={`bg-gradient-to-r ${statusConfig.color} px-6 py-4 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-white text-lg leading-tight pr-2">{booking.parkingId.name}</h3>
            <span className={`${statusConfig.badge} px-3 py-1 rounded-lg text-xs font-bold uppercase flex-shrink-0`}>
              {booking.status}
            </span>
          </div>
          <p className="text-sm text-white/90 line-clamp-2">{booking.parkingId.address}</p>
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

        {/* Time & Duration */}
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

          {/* Pricing */}
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

        {/* Cancel Button for Active Bookings */}
        {booking.status === "active" && (
          <button
            onClick={onCancel}
            className="w-full bg-white border-2 border-red-500 text-red-600 py-3 rounded-xl shadow-md hover:bg-red-50 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold mt-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default ParkingHistory;
