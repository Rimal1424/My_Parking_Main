import React, { useState, useEffect, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';

export const Usernavbar = () => {
  const location = useLocation();
  const logout = () => {
    localStorage.clear();
  }

  const [insight, setInsight] = useState(false)
  const [parkingOpen, setParkingOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Create refs for each dropdown
  const insightRef = useRef(null);
  const parkingRef = useRef(null);
  const profileRef = useRef(null);

  const toggleInsight = () => setInsight(prev => !prev)
  const toggleParking = () => setParkingOpen(prev => !prev);
  const toggleProfile = () => setProfileOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (insightRef.current && !insightRef.current.contains(event.target)) {
        setInsight(false);
      }
      if (parkingRef.current && !parkingRef.current.contains(event.target)) {
        setParkingOpen(false);
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

  const isActive = (path) => location.pathname.includes(path);

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 text-white shadow-2xl sticky top-0 z-50 border-b border-indigo-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link to="/user" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-indigo-500/50 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                My Parking
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Find Parking */}
              <Link to='find-parking'>
                <button className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive('find-parking') 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Find Parking
                </button>
              </Link>

              {/* Parking Insights Dropdown */}
              <div className="relative" ref={insightRef}>
                <button
                  onClick={toggleInsight}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive('history') 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Parking Insights
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${insight ? 'rotate-180' : ''}`}
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
                {insight && (
                  <ul className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden animate-slideDown">
                    <li>
                      <Link
                        to="parking-history"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-600 transition-colors duration-200"
                        onClick={() => setInsight(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Parking History</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="payment-history"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-600 transition-colors duration-200"
                        onClick={() => setInsight(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="font-medium">Payment History</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Parking Locations Dropdown */}
              <div className="relative" ref={parkingRef}>
                <button
                  onClick={toggleParking}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive('location') 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Parking Locations
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${parkingOpen ? 'rotate-180' : ''}`}
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
                {parkingOpen && (
                  <ul className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden animate-slideDown">
                    <li>
                      <Link
                        to="nearby-location"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-600 transition-colors duration-200"
                        onClick={() => setParkingOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span className="font-medium">Nearby Parking Lots</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="saved-location"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-600 transition-colors duration-200"
                        onClick={() => setParkingOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <span className="font-medium">Saved Locations</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive('profile') || isActive('password')
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  User Profile
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`}
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
                  <ul className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden animate-slideDown">
                    <li>
                      <Link
                        to="user-profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-600 transition-colors duration-200"
                        onClick={() => setProfileOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">View Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="edit-profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-600 transition-colors duration-200"
                        onClick={() => setProfileOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="font-medium">Edit Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="change-password"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-600 transition-colors duration-200"
                        onClick={() => setProfileOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        <span className="font-medium">Change Password</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Logout Button */}
              <Link onClick={logout} to="/login">
                <button className="ml-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-600/30 hover:border-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-700 animate-slideDown">
              <div className="space-y-2">
                <Link to='find-parking' onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="font-medium">Find Parking</span>
                  </div>
                </Link>

                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Parking Insights</p>
                  <Link to="parking-history" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">Parking History</span>
                    </div>
                  </Link>
                  <Link to="payment-history" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm">Payment History</span>
                    </div>
                  </Link>
                </div>

                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Parking Locations</p>
                  <Link to="nearby-location" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <span className="text-sm">Nearby Parking Lots</span>
                    </div>
                  </Link>
                  <Link to="saved-location" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span className="text-sm">Saved Locations</span>
                    </div>
                  </Link>
                </div>

                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">User Profile</p>
                  <Link to="user-profile" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">View Profile</span>
                    </div>
                  </Link>
                  <Link to="edit-profile" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="text-sm">Edit Profile</span>
                    </div>
                  </Link>
                  <Link to="change-password" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      <span className="text-sm">Change Password</span>
                    </div>
                  </Link>
                </div>

                <Link onClick={logout} to="/login">
                  <div className="mx-4 mt-4 flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-600/30 hover:border-red-600 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-semibold">Logout</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <Outlet />

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
