import React, { useEffect, useState } from 'react';
import api from '../api';
import { useLocation } from 'react-router-dom';

export const CurrentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/bookings/provider-current", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching provider bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const location = useLocation();
  const isEmbedded = location.pathname === "/provider";

  if (loading) {
    return (
      <div className={`${!isEmbedded ? "bg-white shadow-md border border-gray-200 p-6 rounded-lg mx-4 md:mx-[100px] mt-6" : ""}`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-600 font-semibold">Loading bookings...</span>
        </div>
      </div>
    );
  }

  const BookingCard = ({ booking }) => {
    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'confirmed':
          return 'bg-green-100 text-green-700 border-green-300';
        case 'active':
          return 'bg-blue-100 text-blue-700 border-blue-300';
        case 'pending':
          return 'bg-yellow-100 text-yellow-700 border-yellow-300';
        default:
          return 'bg-gray-100 text-gray-700 border-gray-300';
      }
    };

    const getStatusIcon = (status) => {
      switch (status?.toLowerCase()) {
        case 'confirmed':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          );
        case 'active':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          );
        default:
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          );
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{booking.parkingId?.name || "N/A"}</h3>
              <p className="text-xs text-gray-500">Booking ID: {booking._id?.slice(-8)}</p>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1 ${getStatusColor(booking.status)}`}>
            {getStatusIcon(booking.status)}
            {booking.status}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          {/* User Info */}
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Customer</p>
              <p className="font-semibold text-gray-900 truncate">{booking.userId?.name || "N/A"}</p>
              <p className="text-sm text-gray-600 truncate">{booking.userId?.email || "N/A"}</p>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">Vehicle</p>
              <p className="font-semibold text-gray-900">
                {booking.vehicleType === "2-wheeler" ? "🏍️ Two Wheeler" : "🚗 Four Wheeler"}
              </p>
              <p className="text-sm text-gray-600 font-mono">{booking.vehicleNumber}</p>
            </div>
          </div>

          {/* Time Info */}
          <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
            <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Duration</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Start:</span> {new Date(booking.startTime).toLocaleString('en-IN', { 
                    dateStyle: 'medium', 
                    timeStyle: 'short' 
                  })}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">End:</span> {new Date(booking.endTime).toLocaleString('en-IN', { 
                    dateStyle: 'medium', 
                    timeStyle: 'short' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${!isEmbedded ? "min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4" : ""}`}>
      <div className={`${!isEmbedded ? "max-w-7xl mx-auto" : ""}`}>
        {!isEmbedded && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Current Bookings</h1>
            <p className="text-gray-600">Active parking reservations at your locations</p>
          </div>
        )}

        <div className={`${!isEmbedded ? "bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden" : ""}`}>
          {!isEmbedded && (
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Active Reservations</h2>
                  <p className="text-indigo-100 text-sm">Real-time view of ongoing parking sessions</p>
                </div>
              </div>
            </div>
          )}

          <div className={`${!isEmbedded ? "p-8" : ""}`}>
            {isEmbedded && (
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Current Bookings
                </h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {bookings.length} Active
                </span>
              </div>
            )}

            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Active Bookings</h3>
                <p className="text-gray-600">All your parking spaces are currently available.</p>
              </div>
            ) : (
              <>
                {!isEmbedded && (
                  <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Showing {bookings.length} active {bookings.length === 1 ? 'booking' : 'bookings'}</span>
                  </div>
                )}

                <div className={`grid grid-cols-1 ${!isEmbedded ? 'lg:grid-cols-2' : ''} gap-4`}>
                  {bookings.slice(0, isEmbedded ? 3 : bookings.length).map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))}
                </div>

                {isEmbedded && bookings.length > 3 && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Showing 3 of {bookings.length} bookings
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {!isEmbedded && bookings.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Real-Time Updates</h3>
                <p className="text-sm text-blue-700">
                  This page displays all active parking sessions. Bookings are automatically updated as customers check in and out.
                  Refresh the page to see the latest status.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
