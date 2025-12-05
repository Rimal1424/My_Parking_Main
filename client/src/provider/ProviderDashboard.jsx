import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { CurrentBookings } from './CurrentBookings';

const ProviderDashboard = () => {
  const [locationCount, setLocationCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/provider/analytics/location-wise", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const earnings = response.data.reduce(
          (sum, location) => sum + location.totalEarnings,
          0
        );
        setEarnings(earnings);
      } catch (error) {
        console.error("Error fetching earnings:", error);
      }
    };

    fetchEarnings();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchProviderStats = async () => {
      try {
        const locres = await api.get("/parkinglocations/getlocations", {
          headers: { Authorization: `bearer ${token}` }
        });

        const bookRes = await api.get("/bookings/provider-current", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLocationCount(locres.data.length);
        setBookingCount(bookRes.data.length);

      } catch (error) {
        console.error('Error fetching provider dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 pt-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-xl font-semibold">Loading Provider Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 pt-6 pb-12">
      {/* Header */}
      <header className="bg-white shadow-lg mx-4 md:mx-[100px] rounded-2xl border border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-[50px] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Provider Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your parking locations and bookings</p>
          </div>
          <Link to="/provider/add-parking">
            <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center gap-2 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Parking
            </button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-[100px] py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Parking Locations Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-xl shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">Locations</span>
              </div>
              <h3 className="text-gray-600 font-medium text-sm mb-2">Parking Locations</h3>
              <p className="text-4xl font-bold text-gray-900 mb-4">{locationCount}</p>
              <Link to="/provider/manage-locations">
                <button className="text-indigo-600 font-semibold hover:text-indigo-700 transition-all flex items-center gap-1 group-hover:gap-2">
                  Manage locations
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Total Bookings Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Active</span>
              </div>
              <h3 className="text-gray-600 font-medium text-sm mb-2">Total Bookings</h3>
              <p className="text-4xl font-bold text-gray-900 mb-4">{bookingCount}</p>
              <Link to="/provider/current-bookings">
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-all flex items-center gap-1 group-hover:gap-2">
                  View all bookings
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Earnings Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-xl shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">Revenue</span>
              </div>
              <h3 className="text-gray-600 font-medium text-sm mb-2">Total Earnings</h3>
              <p className="text-4xl font-bold text-gray-900 mb-4">₹{earnings.toLocaleString()}</p>
              <Link to="/provider/analytics">
                <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-all flex items-center gap-1 group-hover:gap-2">
                  View analytics
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Current Bookings Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Current Bookings</h2>
                <p className="text-gray-500 text-sm">Active reservations requiring attention</p>
              </div>
            </div>
          </div>
          
          <CurrentBookings />
          
          <Link to="/provider/current-bookings">
            <button className="mt-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center gap-2 font-semibold">
              View All Bookings
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
