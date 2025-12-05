import React, { useEffect, useState } from "react";
import api from "../api";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("completed"); // "completed" or "cancelled"
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const res = await api.get("/bookings/provider-booking-history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, [token]);

  const completed = bookings.filter((b) => b.status === "completed");
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-xl font-semibold">Loading booking history...</p>
        </div>
      </div>
    );
  }

  const BookingCard = ({ booking, status }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Card Header */}
      <div className={`px-6 py-4 flex items-center justify-between ${
        status === "completed" 
          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200" 
          : "bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            status === "completed" ? "bg-green-100" : "bg-red-100"
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${
              status === "completed" ? "text-green-600" : "text-red-600"
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{booking.parkingId.name}</h3>
            <p className="text-xs text-gray-500">Booking ID: {booking._id.slice(-8)}</p>
          </div>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
          status === "completed"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-red-100 text-red-700 border border-red-300"
        }`}>
          {status === "completed" ? "✓ Completed" : "✕ Cancelled"}
        </span>
      </div>

      {/* Card Body */}
      <div className="px-6 py-5 space-y-4">
        {/* User Info */}
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Customer</p>
            <p className="font-semibold text-gray-900">{booking.userId.name}</p>
            <p className="text-sm text-gray-600">{booking.userId.email}</p>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Vehicle Details</p>
            <p className="font-semibold text-gray-900">
              {booking.vehicleType === "2-wheeler" ? "🏍️ Two Wheeler" : "🚗 Four Wheeler"}
            </p>
            <p className="text-sm text-gray-600 font-mono">{booking.vehicleNumber}</p>
          </div>
        </div>

        {/* Time Info */}
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Duration</p>
            <div className="space-y-1">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">From:</span> {new Date(booking.startTime).toLocaleString('en-IN', { 
                  dateStyle: 'medium', 
                  timeStyle: 'short' 
                })}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">To:</span> {new Date(booking.endTime).toLocaleString('en-IN', { 
                  dateStyle: 'medium', 
                  timeStyle: 'short' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        {status === "completed" && (
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Amount Paid</p>
              <p className="text-2xl font-bold text-emerald-600">₹{booking.pricePaid}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking History</h1>
          <p className="text-gray-600">Complete record of all past bookings at your parking locations</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{completed.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-3xl font-bold text-gray-900">{cancelled.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("completed")}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTab === "completed"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Completed ({completed.length})
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTab === "cancelled"
                  ? "bg-gradient-to-r from-red-500 to-rose-500 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cancelled ({cancelled.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "completed" ? (
              completed.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Completed Bookings</h3>
                  <p className="text-gray-600">Completed bookings will appear here once customers finish their parking sessions.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {completed.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} status="completed" />
                  ))}
                </div>
              )
            ) : (
              cancelled.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Cancelled Bookings</h3>
                  <p className="text-gray-600">Cancelled bookings will appear here if customers cancel their reservations.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {cancelled.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} status="cancelled" />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
