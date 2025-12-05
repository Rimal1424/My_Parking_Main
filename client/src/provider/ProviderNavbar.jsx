import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const ProviderNavbar = () => {
  const logout = () => {
    localStorage.clear();
  };

  const [locationOpen, setLocationOpen] = useState(false);
  const [insightOpen, setInsightOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Create refs for each dropdown
  const locationRef = useRef(null);
  const insightRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationOpen(false);
      }
      if (insightRef.current && !insightRef.current.contains(event.target)) {
        setInsightOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white shadow-2xl border-b border-indigo-800/30 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-8">
            {/* Brand */}
            <Link to="/provider" className="group">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg group-hover:shadow-indigo-500/50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent group-hover:from-indigo-200 group-hover:to-white transition-all duration-300">
                   Provider
                  </h1>
                  <p className="text-xs text-indigo-300">Manage your spaces</p>
                </div>
              </div>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center gap-2 ml-4">
              {/* Manage Locations */}
              <div className="relative" ref={locationRef}>
                <button
                  onClick={() => {
                    setLocationOpen((prev) => !prev);
                    setInsightOpen(false);
                    setProfileOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 ${
                    locationOpen
                      ? 'bg-indigo-700 text-white shadow-lg'
                      : 'hover:bg-indigo-800/50 text-indigo-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Locations
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      locationOpen ? 'rotate-180' : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {locationOpen && (
                  <ul className="absolute mt-2 w-60 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-20 animate-fadeIn">
                    <li>
                      <Link
                        to="add-parking"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 border-b border-gray-100"
                        onClick={() => setLocationOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <div>
                          <p className="font-semibold">Add Parking</p>
                          <p className="text-xs text-gray-500">Create new location</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="my-locations"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200"
                        onClick={() => setLocationOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        <div>
                          <p className="font-semibold">My Locations</p>
                          <p className="text-xs text-gray-500">View all spaces</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Bookings */}
              <div className="relative" ref={insightRef}>
                <button
                  onClick={() => {
                    setInsightOpen((prev) => !prev);
                    setLocationOpen(false);
                    setProfileOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 ${
                    insightOpen
                      ? 'bg-indigo-700 text-white shadow-lg'
                      : 'hover:bg-indigo-800/50 text-indigo-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Bookings
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      insightOpen ? 'rotate-180' : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {insightOpen && (
                  <ul className="absolute mt-2 w-60 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-20 animate-fadeIn">
                    <li>
                      <Link
                        to="current-bookings"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 border-b border-gray-100"
                        onClick={() => setInsightOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-semibold">Current Bookings</p>
                          <p className="text-xs text-gray-500">Active reservations</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="booking-history"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 border-b border-gray-100"
                        onClick={() => setInsightOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-semibold">Booking History</p>
                          <p className="text-xs text-gray-500">Past reservations</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="analytics"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200"
                        onClick={() => setInsightOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <div>
                          <p className="font-semibold">Analytics</p>
                          <p className="text-xs text-gray-500">Performance insights</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setProfileOpen((prev) => !prev);
                    setLocationOpen(false);
                    setInsightOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 ${
                    profileOpen
                      ? 'bg-indigo-700 text-white shadow-lg'
                      : 'hover:bg-indigo-800/50 text-indigo-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      profileOpen ? 'rotate-180' : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {profileOpen && (
                  <ul className="absolute mt-2 w-60 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-20 animate-fadeIn">
                    <li>
                      <Link
                        to="provider-profile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 border-b border-gray-100"
                        onClick={() => setProfileOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-semibold">View Profile</p>
                          <p className="text-xs text-gray-500">Your account details</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="edit-profile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 border-b border-gray-100"
                        onClick={() => setProfileOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <div>
                          <p className="font-semibold">Edit Profile</p>
                          <p className="text-xs text-gray-500">Update information</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="change-password"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200"
                        onClick={() => setProfileOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <div>
                          <p className="font-semibold">Change Password</p>
                          <p className="text-xs text-gray-500">Update security</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Logout */}
            <Link
              to="/login"
              onClick={logout}
              className="ml-auto px-4 py-2 rounded-lg flex items-center gap-2 font-medium bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white border border-red-600/30 hover:border-red-600 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>

      <Outlet />
    </>
  );
};