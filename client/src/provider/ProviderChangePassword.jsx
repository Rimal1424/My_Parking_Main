import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProviderChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError("New passwords do not match.");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      const response = await api.put(`/auth/change-password?token=${token}`, passwordData);

      setSuccess(response.data.message);
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      
      setTimeout(() => {
        navigate("/provider/provider-profile");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setForgotMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(`/auth/forgot-password?token=${token}`);

      setForgotMessage(response.data.message || "Password reset link sent to your email.");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send reset link.");
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 33, label: "Weak", color: "bg-red-500" };
    if (strength <= 3) return { strength: 66, label: "Medium", color: "bg-yellow-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/provider/provider-profile")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-4 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Profile
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Change Password</h1>
          <p className="text-gray-600">Keep your account secure by updating your password regularly</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Security Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Password Security</h2>
                <p className="text-indigo-100 text-sm">Update your password to maintain account security</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {/* Success Message */}
            {success && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg animate-fadeIn">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-700 font-semibold">{success}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-fadeIn">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 font-semibold">{error}</p>
                </div>
              </div>
            )}

            {/* Forgot Password Message */}
            {forgotMessage && (
              <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg animate-fadeIn">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-blue-700 font-semibold">{forgotMessage}</p>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.oldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handleChange}
                    placeholder="Enter your current password"
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("oldPassword")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswords.oldPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter your new password"
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswords.newPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {passwordData.newPassword && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-600">Password Strength:</span>
                      <span className={`text-xs font-bold ${
                        passwordStrength.label === "Weak" ? "text-red-600" :
                        passwordStrength.label === "Medium" ? "text-yellow-600" :
                        "text-green-600"
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswords.confirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Passwords do not match
                  </p>
                )}
                {passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Passwords match
                  </p>
                )}
              </div>
            </div>

            {/* Password Requirements */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Password Requirements
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className={`${passwordData.newPassword.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>●</span>
                  At least 8 characters long
                </li>
                <li className="flex items-center gap-2">
                  <span className={`${/[A-Z]/.test(passwordData.newPassword) && /[a-z]/.test(passwordData.newPassword) ? 'text-green-500' : 'text-gray-400'}`}>●</span>
                  Contains both uppercase and lowercase letters
                </li>
                <li className="flex items-center gap-2">
                  <span className={`${/[0-9]/.test(passwordData.newPassword) ? 'text-green-500' : 'text-gray-400'}`}>●</span>
                  Contains at least one number
                </li>
                <li className="flex items-center gap-2">
                  <span className={`${/[^a-zA-Z0-9]/.test(passwordData.newPassword) ? 'text-green-500' : 'text-gray-400'}`}>●</span>
                  Contains at least one special character
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Updating Password...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Password
                  </>
                )}
              </button>
              <button
                onClick={() => navigate("/provider/provider-profile")}
                disabled={loading}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleForgotPassword}
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-all flex items-center gap-2 mx-auto group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Forgot your current password?
              </button>
              <p className="text-sm text-gray-500 mt-2">We'll send a reset link to your email</p>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Security Tips</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Use a unique password that you don't use for other accounts</li>
                <li>• Avoid using personal information in your password</li>
                <li>• Change your password regularly for better security</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProviderChangePassword;
