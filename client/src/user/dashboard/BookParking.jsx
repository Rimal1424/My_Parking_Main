import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";

const BookParking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { parkingId, parkingName, pricing } = location.state || {};
  const [vehicleType, setVehicleType] = useState("2-wheeler");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [amountPayable, setAmountPayable] = useState(0);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const token = localStorage.getItem("token");
  const pricingRates = pricing || { "2-wheeler": 5, "4-wheeler": 10 };

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const diffInMs = end - start;
      const diffInHours = diffInMs / (1000 * 60 * 60);
      if (diffInHours > 0) {
        setTotalHours(Math.ceil(diffInHours));
        const hourlyRate = pricingRates[vehicleType];
        setAmountPayable(Math.ceil(diffInHours) * hourlyRate);
      } else {
        setTotalHours(0);
        setAmountPayable(0);
      }
    }
  }, [startTime, endTime, vehicleType]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setProcessing(true);

    if (!parkingId || !vehicleNumber || !startTime || !endTime) {
      setError("Please fill in all required fields.");
      setProcessing(false);
      return;
    }

    if (amountPayable <= 0) {
      setError("Invalid amount. Please check your booking times.");
      setProcessing(false);
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      setError("Razorpay SDK failed to load. Please try again.");
      setProcessing(false);
      return;
    }

    try {
      const userResponse = await api.get(`/auth/profile?token=${token}`);
      const { name, email, phone } = userResponse.data;

      const orderResponse = await api.post(
        "/payments/create-order",
        { amount: amountPayable },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, razorpayKey } = orderResponse.data;

      const options = {
        key: razorpayKey,
        amount: amountPayable,
        currency: "INR",
        name: "Parking Payment",
        description: `Booking at ${parkingName}`,
        order_id: orderId,
        handler: async function (response) {
          try {
            await api.post(
              "/payments/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paidamount: amountPayable
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            const bookingResponse = await api.post(
              "/bookings/book-parking",
              {
                parkingId,
                vehicleType,
                vehicleNumber,
                startTime,
                endTime,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (bookingResponse.status === 201) {
              navigate("/user");
            }
          } catch (err) {
            console.error("Error verifying or booking:", err);
            setError("Payment verification or booking failed.");
          } finally {
            setProcessing(false);
          }
        },
        prefill: {
          name: name || "User",
          email: email || "user@example.com",
          contact: phone || "9999999999",
        },
        theme: {
          color: "#2563EB",
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Error during payment flow:", err);
      setError("Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Book Your Parking</h2>
                    <p className="text-indigo-100 text-sm">Complete the details to reserve your spot</p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mx-8 mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 font-semibold">{error}</p>
                  </div>
                </div>
              )}

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Parking Location */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Parking Location
                  </label>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-4">
                    <p className="text-gray-900 font-bold text-lg">{parkingName || "No parking selected"}</p>
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Vehicle Type
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setVehicleType("2-wheeler")}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        vehicleType === "2-wheeler"
                          ? "bg-blue-50 border-blue-500 shadow-lg"
                          : "bg-white border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${vehicleType === "2-wheeler" ? "text-blue-600" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className={`font-semibold ${vehicleType === "2-wheeler" ? "text-blue-900" : "text-gray-600"}`}>
                          2-Wheeler
                        </span>
                        <span className="text-xs text-gray-500">₹{pricingRates["2-wheeler"]}/hr</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVehicleType("4-wheeler")}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        vehicleType === "4-wheeler"
                          ? "bg-blue-50 border-blue-500 shadow-lg"
                          : "bg-white border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${vehicleType === "4-wheeler" ? "text-blue-600" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className={`font-semibold ${vehicleType === "4-wheeler" ? "text-blue-900" : "text-gray-600"}`}>
                          4-Wheeler
                        </span>
                        <span className="text-xs text-gray-500">₹{pricingRates["4-wheeler"]}/hr</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Vehicle Number */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Vehicle Number
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., MH 12 AB 1234"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-900 placeholder-gray-400 font-mono font-semibold"
                    required
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Parking Duration
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 font-medium mb-2">Start Time</label>
                      <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 font-medium mb-2">End Time</label>
                      <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none text-gray-900"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing || !totalHours || totalHours <= 0}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Proceed to Payment
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 sticky top-6">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 rounded-t-2xl">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Booking Summary
                </h3>
              </div>

              <div className="p-6 space-y-4">
                {totalHours > 0 ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                        <span className="text-sm text-gray-600 font-medium">Vehicle Type</span>
                        <span className="text-sm font-bold text-gray-900 capitalize">{vehicleType}</span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                        <span className="text-sm text-gray-600 font-medium">Hourly Rate</span>
                        <span className="text-sm font-bold text-gray-900">₹{pricingRates[vehicleType]}/hr</span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                        <span className="text-sm text-gray-600 font-medium">Total Duration</span>
                        <span className="text-sm font-bold text-gray-900">{totalHours} {totalHours === 1 ? 'hour' : 'hours'}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Total Amount</span>
                        <span className="text-3xl font-bold text-emerald-600">₹{amountPayable}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mt-4">
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-xs text-blue-800">
                          <p className="font-semibold mb-1">Payment Information</p>
                          <ul className="space-y-1">
                            <li>• Secure payment via Razorpay</li>
                            <li>• All major payment methods accepted</li>
                            <li>• Instant booking confirmation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-500">Fill in the booking details to see the pricing summary</p>
                  </div>
                )}
              </div>
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

export default BookParking;
