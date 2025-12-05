import React, { useState, useEffect } from 'react';
import { SearchResults } from './Searchresults';
import { useLocation } from 'react-router-dom';
import api from "../../api";

export const Findparking = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  
  // Debounce function to delay API calls
  useEffect(() => {
    if (!searchQuery.trim()) {
      setShowResults(false);
      setSearchResults([]);
      setError("");
      return;
    }

    const delayTimer = setTimeout(() => {
      handleInstantSearch();
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  // Instant search function
  const handleInstantSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`parkingLocations/searchparking?q=${encodeURIComponent(searchQuery)}&token=${token}`);
      
      if (response.data.length === 0) {
        setError("No parking locations found");
        setSearchResults([]);
        setShowResults(false);
      } else {
        setSearchResults(response.data);
        setShowResults(true);
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error searching");
      setShowResults(false);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setSearchResults([]);
    setError("");
  };

  return (
    <div className={`${location.pathname === "/user/find-parking" ? "min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12" : ""}`}>
      <div className={`${location.pathname === "/user/find-parking" ? "max-w-7xl mx-auto px-4 md:px-8" : ""}`}>
        {/* Page Header (only on dedicated page) */}
        {location.pathname === "/user/find-parking" && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Parking</h1>
            <p className="text-gray-600 text-lg">Search for available parking spots near you</p>
          </div>
        )}

        {/* Search Card */}
        <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${location.pathname === "/user/find-parking" ? "" : "mx-4 md:mx-8 my-8"}`}>
          {/* Search Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Search Parking Locations</h2>
                <p className="text-indigo-100 text-sm">Enter location name or address to find nearby spots</p>
              </div>
            </div>
          </div>

          {/* Search Input Section */}
          <div className="p-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Search Location
              </label>
              
              <div className="relative">
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Search by name or address (e.g., Downtown, Andheri, Mall Road)"
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full pl-14 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-gray-900 placeholder-gray-400 text-lg"
                />

                {/* Loading Spinner */}
                {loading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-indigo-600 border-t-transparent"></div>
                  </div>
                )}

                {/* Clear Button */}
                {searchQuery && !loading && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-all"
                    aria-label="Clear search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Helper Text */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Results appear automatically as you type • Minimum 1 character</span>
              </div>
            </div>

            {/* Quick Search Suggestions */}
            {!searchQuery && (
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-indigo-100">
                <div className="flex items-center gap-2 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Search Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    Try searching by area name (e.g., "Andheri", "Downtown")
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    Search by landmark (e.g., "Mall Road", "City Center")
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    Enter specific street names or zip codes
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`bg-white border-l-4 border-red-500 rounded-xl shadow-lg p-6 mt-6 animate-fadeIn ${location.pathname === "/user/find-parking" ? "" : "mx-4 md:mx-8"}`}>
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-700 mb-3">{error}</p>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 font-medium mb-2">Try these suggestions:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Check your spelling</li>
                    <li>• Use more general terms</li>
                    <li>• Try different keywords</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results Count */}
        {showResults && searchResults.length > 0 && (
          <div className={`mt-6 ${location.pathname === "/user/find-parking" ? "" : "mx-4 md:mx-8"}`}>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Found {searchResults.length} parking location{searchResults.length !== 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-gray-600">
                      Showing results for "{searchQuery}"
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearSearch}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 transition-colors"
                >
                  Clear
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {showResults && <SearchResults results={searchResults} />}
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
