import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api"; 

const Userprofile = () => {
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 max-w-md text-center">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Profile</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <Link to="/login">
            <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-xl font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h1>
          <p className="text-gray-600">Manage your personal information and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card - Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header Gradient */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 relative">
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              {/* Avatar Section */}
              <div className="relative px-6 pb-6">
                <div className="flex flex-col items-center -mt-16">
                  {/* Avatar */}
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white">
                    {getInitials(user.name)}
                  </div>

                  {/* Name */}
                  <h2 className="text-2xl font-bold text-gray-900 mt-4 text-center">{user.name}</h2>
                  
                  {/* Role Badge */}
                  <span className="mt-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                    User Account
                  </span>

                  {/* Edit Profile Button */}
                  <Link to='/user/edit-profile' className="w-full mt-6">
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center gap-2 font-semibold">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Type</span>
                  <span className="text-sm font-semibold text-gray-900">Standard User</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-semibold text-gray-900">2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details - Right Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Personal Information</h3>
                    <p className="text-indigo-100 text-sm">Your account details and contact information</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Full Name */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <FaUserCircle className="text-indigo-600 text-lg" />
                    Full Name
                  </label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 group-hover:border-indigo-300 transition-colors">
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <FaEnvelope className="text-emerald-600 text-lg" />
                    Email Address
                  </label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 group-hover:border-emerald-300 transition-colors">
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <FaPhone className="text-blue-600 text-lg" />
                    Phone Number
                  </label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 group-hover:border-blue-300 transition-colors">
                    <p className="text-gray-900 font-medium">{user.phone}</p>
                  </div>
                </div>

                {/* Gender */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <FaUser className="text-purple-600 text-lg" />
                    Gender
                  </label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 group-hover:border-purple-300 transition-colors">
                    <p className="text-gray-900 font-medium capitalize">{user.gender}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security & Settings Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Security & Settings</h3>
                    <p className="text-emerald-100 text-sm">Manage your account security</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <Link to='/user/change-password'>
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    Change Password
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
