import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const AboutUs = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <Link className="bg-white text-gray-900 px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold" to="/login">
              Login
            </Link>
            <Link className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-300 font-semibold" to="/signup">
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
            <Link className="bg-white text-gray-900 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center font-semibold" to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center font-semibold" to="/signup" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-white py-32 mt-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="bg-blue-500/20 text-blue-300 px-6 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-blue-500/30">
                About Our Company
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              Elevate Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Parking Experience
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Effortless, secure, and intelligent parking solutions at your fingertips
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Brand Story */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">The Future of Smart Parking</h2>
                </div>

                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>
                    At <span className="text-blue-400 font-bold">MyParking</span>, we believe in transforming urban mobility with 
                    cutting-edge parking solutions. No more circling blocks or struggling with 
                    cash payments—our <strong className="text-white">seamless, AI-powered system</strong> ensures you find the 
                    perfect spot, every time.
                  </p>
                  <p>
                    Whether you're in a rush or planning ahead, we provide <strong className="text-white">real-time parking 
                    availability</strong>, <strong className="text-white">cashless payments</strong>, and <strong className="text-white">trusted parking spaces</strong> at the 
                    best rates.
                  </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">10K+</p>
                    <p className="text-sm text-gray-400 mt-1">Users</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-400">500+</p>
                    <p className="text-sm text-gray-400 mt-1">Locations</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">24/7</p>
                    <p className="text-sm text-gray-400 mt-1">Support</p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-300"
                  >
                    Get in Touch
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FeatureItem 
                icon="🚗" 
                title="Find & Reserve Instantly" 
                description="Book your spot in seconds"
                gradient="from-blue-500 to-cyan-500"
              />
              <FeatureItem 
                icon="📍" 
                title="Real-Time Availability" 
                description="See live parking updates"
                gradient="from-indigo-500 to-purple-500"
              />
              <FeatureItem 
                icon="💳" 
                title="Cashless Payments" 
                description="Secure digital transactions"
                gradient="from-purple-500 to-pink-500"
              />
              <FeatureItem 
                icon="🔐" 
                title="Verified Parking" 
                description="Trusted and safe locations"
                gradient="from-pink-500 to-rose-500"
              />
              <FeatureItem 
                icon="🕒" 
                title="24/7 Support" 
                description="Always here to help"
                gradient="from-emerald-500 to-teal-500"
              />
              <FeatureItem 
                icon="⚡" 
                title="Lightning Fast" 
                description="Quick and reliable system"
                gradient="from-yellow-500 to-orange-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MyParking?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our premium parking solutions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TrustCard 
              icon="🎯"
              title="Mission Driven"
              description="Committed to making urban parking stress-free and accessible for everyone"
            />
            <TrustCard 
              icon="🌟"
              title="Customer First"
              description="Your satisfaction is our priority with dedicated support and service"
            />
            <TrustCard 
              icon="🚀"
              title="Innovation"
              description="Leading the industry with cutting-edge technology and smart solutions"
            />
          </div>
        </div>
      </section>

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
                <p className="text-sm text-gray-400 mb-3">Stay updated with our latest news</p>
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
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

const FeatureItem = ({ icon, title, description, gradient }) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
      <div className="relative z-10">
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl mb-4 text-3xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const TrustCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default AboutUs;
