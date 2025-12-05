import React, { useEffect, useState } from "react";
import api from "../../api";

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions/user");
        setTransactions(res.data);
      } catch (err) {
        setError("Failed to load payment history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Calculate totals
  const totalPaid = transactions
    .filter(tx => tx.status === "success")
    .reduce((sum, tx) => sum + (tx.paidamount || 0), 0);

  const successfulTransactions = transactions.filter(tx => tx.status === "success");
  const failedTransactions = transactions.filter(tx => tx.status !== "success");

  // Filter transactions
  const getFilteredTransactions = () => {
    switch (filter) {
      case "success":
        return successfulTransactions;
      case "failed":
        return failedTransactions;
      default:
        return transactions;
    }
  };

  const filteredTransactions = getFilteredTransactions();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-xl font-semibold">Loading payment history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 max-w-md text-center">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Payment History</h1>
          <p className="text-gray-600 text-lg">Track all your payment transactions and spending</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-6 -mb-6"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-emerald-100 font-semibold text-sm mb-2 uppercase tracking-wide">Total Spent</h3>
                <p className="text-5xl font-bold text-white">₹{totalPaid.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 px-6 py-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-6 -mb-6"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-blue-100 font-semibold text-sm mb-2 uppercase tracking-wide">Successful</h3>
                <p className="text-5xl font-bold text-white">{successfulTransactions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-red-500 to-rose-600 px-6 py-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-6 -mb-6"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-red-100 font-semibold text-sm mb-2 uppercase tracking-wide">Failed</h3>
                <p className="text-5xl font-bold text-white">{failedTransactions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Transaction History</h2>
                  <p className="text-indigo-100 text-sm">All your payment records</p>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                {["all", "success", "failed"].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                      filter === filterType
                        ? "bg-white text-indigo-600 shadow-lg"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No Transactions Found</h3>
                <p className="text-gray-600">You don't have any {filter !== "all" ? filter : ""} transactions yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTransactions.map((tx, index) => (
                  <TransactionCard key={index} transaction={tx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionCard = ({ transaction }) => {
  const isSuccess = transaction.status === "success";

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 gap-4">
        {/* Left Section */}
        <div className="flex items-start gap-4 flex-1">
          {/* Icon */}
          <div className={`p-4 rounded-xl flex-shrink-0 ${
            isSuccess 
              ? "bg-gradient-to-br from-emerald-100 to-emerald-200" 
              : "bg-gradient-to-br from-red-100 to-red-200"
          }`}>
            {isSuccess ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>

          {/* Transaction Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-gray-900 text-lg">Parking Payment</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                isSuccess 
                  ? "bg-emerald-100 text-emerald-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {isSuccess ? "Completed" : "Failed"}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Order ID:</span>{" "}
                <span className="font-mono text-xs">{transaction.razorpay_order_id}</span>
              </p>
              {transaction.razorpay_payment_id && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Payment ID:</span>{" "}
                  <span className="font-mono text-xs">{transaction.razorpay_payment_id}</span>
                </p>
              )}
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(transaction.createdAt).toLocaleString('en-IN', { 
                  dateStyle: 'medium', 
                  timeStyle: 'short' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Amount */}
        <div className="flex items-center md:justify-end">
          <div className="text-right">
            <p className="text-sm text-gray-600 font-medium mb-1">Amount</p>
            <p className={`text-3xl font-bold ${
              isSuccess ? "text-emerald-600" : "text-gray-400"
            }`}>
              ₹{(transaction.paidamount || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
