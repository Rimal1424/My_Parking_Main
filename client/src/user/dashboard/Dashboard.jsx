import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Findparking } from './Findparking';
import { Link } from 'react-router-dom';
import ActiveBookings from './ActiveBookings';

const Dashboard = () => {
  const [showResults, setShowResults] = useState(false);
  const [savedlocationNum, setsavedlocationNum] = useState(undefined);
  const [activebookingNum, setactivebookingNum] = useState(undefined);
  const [totalPaid, setTotalPaid] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const setactivebookingNumber = (num) => {
    setactivebookingNum(num);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  useEffect(() => {
    const fetchSavedLocations = async () => {
      const token = localStorage.getItem("token");
      const response = await api.get(`/auth/get-saved-locations?token=${token}`);
      setsavedlocationNum(response.data.length);
    };

    fetchSavedLocations();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions/user");
        const data = res.data;
  
        const total = data
          .filter(tx => tx.status === "success")
          .reduce((acc, tx) => acc + tx.paidamount, 0);
  
        setTotalPaid(total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                Welcome Back! 👋
              </h1>
              <p className="text-indigo-100 text-lg">Manage your parking reservations and discover nearby spots</p>
            </div>
            <Link to="find-parking"> 
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 flex items-center gap-3 font-bold text-lg group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Book Parking Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 -mt-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Active Bookings Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-6 -mb-6"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <span className="bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Live</span>
                </div>
                <h3 className="text-indigo-100 font-semibold text-sm mb-2 uppercase tracking-wide">Active Bookings</h3>
                <div className="flex items-end gap-3">
                  <p className="text-5xl font-bold text-white">
                    {activebookingNum !== undefined ? activebookingNum : (
                      <span className="text-3xl text-white/70 animate-pulse">...</span>
                    )}
                  </p>
                  {activebookingNum > 0 && (
                    <span className="bg-green-400 text-green-900 px-2 py-1 rounded-lg text-xs font-bold mb-2">
                      +{activebookingNum} Active
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6">
              <Link to="parking-history">
                <button className="w-full text-blue-600 font-bold hover:text-blue-700 transition-all flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 py-3 rounded-xl group">
                  View All Bookings
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Total Spent Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-6 -mb-6"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Total</span>
                </div>
                <h3 className="text-emerald-100 font-semibold text-sm mb-2 uppercase tracking-wide">Total Spent</h3>
                <div className="flex items-end gap-2">
                  <p className="text-5xl font-bold text-white">
                    {loading ? (
                      <span className="text-3xl text-white/70 animate-pulse">...</span>
                    ) : (
                      `₹${totalPaid.toLocaleString()}`
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <Link to="payment-history">
                <button className="w-full text-emerald-600 font-bold hover:text-emerald-700 transition-all flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 py-3 rounded-xl group">
                  View Payment History
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Saved Locations Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-6 -mb-6"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  <span className="bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Saved</span>
                </div>
                <h3 className="text-purple-100 font-semibold text-sm mb-2 uppercase tracking-wide">Saved Locations</h3>
                <div className="flex items-end gap-3">
                  <p className="text-5xl font-bold text-white">
                    {savedlocationNum !== undefined ? savedlocationNum : (
                      <span className="text-3xl text-white/70 animate-pulse">...</span>
                    )}
                  </p>
                  {savedlocationNum > 0 && (
                    <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg text-xs font-bold mb-2">
                      ★ Favorites
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6">
              <Link to='saved-location'>
                <button className="w-full text-purple-600 font-bold hover:text-purple-700 transition-all flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 py-3 rounded-xl group">
                  Manage Locations
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="find-parking" className="group">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:border-indigo-200">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-4 rounded-xl group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Find Parking</h3>
                  <p className="text-sm text-gray-600">Search nearby spots</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="nearby-location" className="group">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Nearby Lots</h3>
                  <p className="text-sm text-gray-600">Explore locations</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="user-profile" className="group">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:border-emerald-200">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-4 rounded-xl group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">My Profile</h3>
                  <p className="text-sm text-gray-600">Account settings</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Active Bookings Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Your Active Bookings</h2>
                <p className="text-indigo-100 text-sm">Current parking sessions in progress</p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <ActiveBookings setactivebookingNumber={setactivebookingNumber} />
          </div>
        </div>
      </main>
      
      <Findparking/>
    </div>
  );
};

export default Dashboard;
