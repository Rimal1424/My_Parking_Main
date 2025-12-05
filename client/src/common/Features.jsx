import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaLock, FaCar, FaWallet, FaHeadset } from "react-icons/fa";

export const Features = () => {
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-white py-32 mt-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000"></div>
          <div className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="bg-blue-500/20 text-blue-300 px-6 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-blue-500/30">
                Product Features
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Smart. Secure. Seamless.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the next level of hassle-free parking with cutting-edge technology
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaClock size={32} />}
              title="Instant Booking & Reservation" 
              description="Find, book, and secure your parking space in seconds with real-time availability." 
              gradient="from-blue-500 to-cyan-500"
              delay="0"
            />
            <FeatureCard 
              icon={<FaMapMarkerAlt size={32} />}
              title="Live Location Tracking" 
              description="Easily navigate to your reserved parking spot with precise GPS guidance." 
              gradient="from-indigo-500 to-purple-500"
              delay="100"
            />
            <FeatureCard 
              icon={<FaLock size={32} />}
              title="Secure & Verified Parking" 
              description="Park with confidence in monitored and security-enabled parking spaces." 
              gradient="from-purple-500 to-pink-500"
              delay="200"
            />
            <FeatureCard 
              icon={<FaCar size={32} />}
              title="Multiple Vehicle Support" 
              description="Seamlessly book parking for cars, bikes, or electric vehicles with customized pricing." 
              gradient="from-pink-500 to-rose-500"
              delay="300"
            />
            <FeatureCard 
              icon={<FaWallet size={32} />}
              title="Cashless & Contactless Payment" 
              description="Pay securely using digital wallets, UPI, and cards for a hassle-free experience." 
              gradient="from-emerald-500 to-teal-500"
              delay="400"
            />
            <FeatureCard 
              icon={<FaHeadset size={32} />}
              title="24/7 Customer Support" 
              description="Our dedicated support team is always available to assist you anytime, anywhere." 
              gradient="from-yellow-500 to-orange-500"
              delay="500"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why MyParking Stands Out</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover the advantages that make us the preferred parking solution</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BenefitCard 
              number="01"
              title="Save Time & Money"
              description="Stop wasting fuel searching for parking. Our smart system finds the best spots at competitive rates, saving you both time and money."
              color="blue"
            />
            <BenefitCard 
              number="02"
              title="Enhanced Security"
              description="All parking locations are verified and monitored with CCTV surveillance, ensuring your vehicle's safety at all times."
              color="indigo"
            />
            <BenefitCard 
              number="03"
              title="Eco-Friendly Solution"
              description="Reduce carbon emissions by eliminating unnecessary driving. Our efficient routing helps create a greener environment."
              color="emerald"
            />
            <BenefitCard 
              number="04"
              title="Flexible Booking Options"
              description="Book in advance or find instant parking on-the-go. Cancel or modify your bookings easily with our flexible policies."
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl top-0 right-0"></div>
          <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl bottom-0 left-0"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Parking Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied users who have made parking stress-free with MyParking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-indigo-600 bg-white rounded-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-white/10 backdrop-blur-sm border-2 border-white rounded-xl shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              Contact Sales
            </Link>
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
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, gradient, delay }) => {
  return (
    <div 
      className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          <div className="text-white">
            {icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>

        {/* Arrow Icon */}
        <div className="mt-6 flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
          <span className="text-sm font-semibold mr-2">Learn more</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const BenefitCard = ({ number, title, description, color }) => {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    indigo: "from-indigo-500 to-purple-500",
    emerald: "from-emerald-500 to-teal-500",
    purple: "from-purple-500 to-pink-500"
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      {/* Number Badge */}
      <div className={`absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
        <span className="text-white font-bold text-xl">{number}</span>
      </div>

      {/* Content */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative Element */}
      <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${colorClasses[color]} opacity-5 rounded-tl-full`}></div>
    </div>
  );
};

export default Features;
