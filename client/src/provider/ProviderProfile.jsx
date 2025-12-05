import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api";

const ProviderProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch profile using token in URL
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }
      try {
        const res = await api.get(`/auth/profile?token=${token}`);
        setUser(res.data);
      } catch (err) {
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          {error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 font-semibold text-lg">{error}</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600 text-xl font-semibold">Loading profile...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header with Gradient Background */}
          <div className="relative h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <FaUserCircle className="text-indigo-600 text-8xl" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            {/* Name and Role */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Parking Provider
              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Email Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Email Address</p>
                    <p className="text-gray-900 font-medium break-all">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500 p-3 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">Phone Number</p>
                    <p className="text-gray-900 font-medium">{user.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information Section */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FaUser className="text-gray-400 text-lg" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Account Status</p>
                    <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/provider/edit-profile" className="flex-1">
                <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              </Link>
              <Link to="/provider/change-password" className="flex-1">
                <button className="w-full bg-white border-2 border-indigo-600 text-indigo-600 py-4 rounded-xl shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Change Password
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Quick Actions */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/provider" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-indigo-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-700">Dashboard</p>
          </Link>

          <Link to="/provider/my-locations" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-700">Locations</p>
          </Link>

          <Link to="/provider/current-bookings" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-700">Bookings</p>
          </Link>

          <Link to="/provider/analytics" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-emerald-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-700">Analytics</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
