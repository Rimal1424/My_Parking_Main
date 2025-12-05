import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from "../api";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export const ProviderSignup = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "provider"
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!agreedToTerms) {
            setError("Please agree to the terms and conditions");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/auth/register", form);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role)
            navigate("/provider");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
            {/* Enhanced Navbar */}
            <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white fixed top-0 w-full shadow-2xl py-4 px-6 z-50 backdrop-blur-sm bg-opacity-95">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <Link className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300" to="/">
                            MyParking
                        </Link>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex space-x-8 text-base">
                            <li>
                                <Link className="hover:text-blue-400 transition duration-300 relative group" to="/aboutus">
                                    About
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-blue-400 transition duration-300 relative group" to="/feature">
                                    Features
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-blue-400 transition duration-300 relative group" to="/contact">
                                    Contact
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex space-x-4">
                        <Link className="bg-white text-gray-900 px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold" to="/provider-login">
                            Login
                        </Link>
                        <Link className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-300 font-semibold" to="/provider-signup">
                            Register
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden hover:bg-gray-800 p-2 rounded-lg transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-gradient-to-b from-gray-800 to-gray-900 text-white py-6 px-6 absolute top-full left-0 w-full flex flex-col space-y-4 shadow-2xl animate-slideDown">
                        <Link className="hover:text-blue-400 hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-300" to="/" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                        <Link className="hover:text-blue-400 hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-300" to="/aboutus" onClick={() => setMenuOpen(false)}>
                            About
                        </Link>
                        <Link className="hover:text-blue-400 hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-300" to="/feature" onClick={() => setMenuOpen(false)}>
                            Features
                        </Link>
                        <Link className="hover:text-blue-400 hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-300" to="/contact" onClick={() => setMenuOpen(false)}>
                            Contact
                        </Link>
                        <Link className="bg-white text-gray-900 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center font-semibold" to="/provider-login" onClick={() => setMenuOpen(false)}>
                            Login
                        </Link>
                        <Link className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center font-semibold" to="/provider-signup" onClick={() => setMenuOpen(false)}>
                            Register
                        </Link>
                    </div>
                )}
            </nav>

            {/* Signup Section */}
            <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1f3a] via-[#2d3561] to-[#1a1f3a] overflow-hidden pt-20 py-12">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2d3561]/30 to-transparent"></div>

                {/* Main Container */}
                <div className="relative z-10 w-full max-w-[520px] mx-4">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4169E1] to-[#6B8EFF] rounded-3xl shadow-2xl mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-[#8FA4FF] tracking-wide">
                            MyParking
                        </h1>
                        <p className="text-[#6B8EFF] text-sm mt-2 font-semibold">Provider Registration</p>
                    </div>

                    {/* Glass Card */}
                    <div className="relative bg-white/5 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/10 p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Join as a Provider</h2>
                            <p className="text-[#a8b3cf] text-sm leading-relaxed">
                                Start earning by listing your parking spaces
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 bg-red-500/10 border border-red-400/30 rounded-2xl p-4 backdrop-blur-sm animate-fadeIn">
                                <div className="flex items-start gap-3">
                                    <div className="bg-red-500 p-1.5 rounded-full flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-red-300 font-semibold text-sm">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="block text-[#a8b3cf] font-semibold text-sm">
                                    Full Name / Business Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6B8EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#6B7A99] focus:outline-none focus:border-[#4169E1] focus:ring-2 focus:ring-[#4169E1]/20 transition-all duration-300 text-sm"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="block text-[#a8b3cf] font-semibold text-sm">
                                    Business Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6B8EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your business email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#6B7A99] focus:outline-none focus:border-[#4169E1] focus:ring-2 focus:ring-[#4169E1]/20 transition-all duration-300 text-sm"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Phone Input */}
                            <div className="space-y-2">
                                <label className="block text-[#a8b3cf] font-semibold text-sm">
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6B8EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter 10-digit mobile number"
                                        value={form.phone}
                                        onChange={handleChange}
                                        pattern="[0-9]{10}"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#6B7A99] focus:outline-none focus:border-[#4169E1] focus:ring-2 focus:ring-[#4169E1]/20 transition-all duration-300 text-sm"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="block text-[#a8b3cf] font-semibold text-sm">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6B8EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Create a strong password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#6B7A99] focus:outline-none focus:border-[#4169E1] focus:ring-2 focus:ring-[#4169E1]/20 transition-all duration-300 text-sm"
                                        required
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#6B8EFF] hover:text-[#8FA4FF] transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <p className="text-[#6B7A99] text-xs mt-1">
                                    Must be at least 8 characters long
                                </p>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                    disabled={loading}
                                />
                                <label htmlFor="terms" className="text-[#a8b3cf] text-xs leading-relaxed">
                                    I agree to the{" "}
                                    <Link to="#" className="text-[#6B8EFF] hover:text-[#8FA4FF] font-semibold">
                                        Terms and Conditions
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="#" className="text-[#6B8EFF] hover:text-[#8FA4FF] font-semibold">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-[#4169E1] to-[#5B7EFF] hover:from-[#5B7EFF] hover:to-[#4169E1] text-white font-bold text-base rounded-2xl shadow-lg hover:shadow-[#4169E1]/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                        <span>Create Provider Account</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Provider Benefits */}
                        <div className="mt-6 bg-blue-500/10 border border-blue-400/30 rounded-2xl p-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-500/20 p-2 rounded-xl flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-blue-300 font-semibold text-sm mb-2">What you'll get:</p>
                                    <ul className="text-blue-200 text-xs space-y-1">
                                        <li>• Full access to provider dashboard</li>
                                        <li>• Real-time booking management</li>
                                        <li>• Automated payment processing</li>
                                        <li>• 24/7 customer support</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Login Link */}
                        <div className="text-center mt-6 pt-6 border-t border-white/10">
                            <p className="text-sm text-[#a8b3cf]">
                                Already have an account?{" "}
                                <Link to="/provider-login" className="text-[#6B8EFF] hover:text-[#8FA4FF] font-semibold transition-colors">
                                    Login here
                                </Link>
                            </p>
                        </div>

                        {/* User Signup Link */}
                        <div className="text-center mt-3">
                            <p className="text-xs text-[#6B7A99]">
                                Looking for user registration?{" "}
                                <Link to="/signup" className="text-[#6B8EFF] hover:text-[#8FA4FF] font-semibold transition-colors">
                                    Click here
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-[#6B7A99]">
                            Need help?{" "}
                            <Link to="/contact" className="text-[#6B8EFF] hover:text-[#8FA4FF] font-semibold transition-colors">
                                Contact Support
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Enhanced Footer */}
            <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        {/* Company Branding */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                MyParking
                            </h2>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Your seamless parking solution. Book your spot hassle-free anytime, anywhere.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Trusted by 10,000+ users
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-blue-500 rounded"></span>
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/aboutus" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300"></span>
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/feature" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300"></span>
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300"></span>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-blue-500 rounded"></span>
                                Contact Us
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    <span className="text-gray-400">123 Parking Street, City, Country</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-400">support@myparking.com</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-gray-400">+123 456 7890</span>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-blue-500 rounded"></span>
                                Follow Us
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <Link to="#" className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-110 shadow-lg">
                                    <FaFacebookF className="text-white text-lg" />
                                </Link>
                                <Link to="#" className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 shadow-lg">
                                    <FaTwitter className="text-white text-lg" />
                                </Link>
                                <Link to="#" className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-110 shadow-lg">
                                    <FaInstagram className="text-white text-lg" />
                                </Link>
                                <Link to="#" className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-110 shadow-lg">
                                    <FaLinkedinIn className="text-white text-lg" />
                                </Link>
                            </div>

                            {/* Newsletter */}
                            <div className="mt-6">
                                <p className="text-sm text-gray-400 mb-3">Stay updated with latest news</p>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                                    />
                                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-gray-400">
                                &copy; {new Date().getFullYear()} MyParking. All rights reserved.
                            </p>
                            <div className="flex gap-6 text-sm text-gray-400">
                                <Link to="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                                <Link to="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
                                <Link to="#" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

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
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    )
}

export default ProviderSignup;
