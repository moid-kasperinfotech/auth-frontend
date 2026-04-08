import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiCheckCircle,
  FiCalendar,
  FiLogOut,
  FiLogIn,
  FiHome,
  FiUserCheck,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user ? (
          // Logged In View - Show User Data
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.user?.name}!
              </h1>
              <p className="text-indigo-100">
                Great to see you again. Here's your account information.
              </p>
            </div>

            {/* User Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                  <FiUserCheck className="h-5 w-5 text-indigo-600" />
                  Profile Information
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Name */}
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FiUser className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Full Name</p>
                      <p className="text-base font-medium text-slate-800">
                        {user.user?.name}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FiMail className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Email Address
                      </p>
                      <p className="text-base font-medium text-slate-800">
                        {user.user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Role & Verification */}
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FiCheckCircle className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Role & Status
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-md capitalize">
                          {user.user?.role}
                        </span>
                        {user.user?.isVerified && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md flex items-center gap-1">
                            <FiCheckCircle className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                        {user.isActive && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Created At */}
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl md:col-span-2">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FiCalendar className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Member Since
                      </p>
                      <p className="text-base font-medium text-slate-800">
                        {formatDate(user.user?.createdAt)}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Last updated: {formatDate(user.user?.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Not Logged In View
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-center max-w-md">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUser className="h-10 w-10 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                  Not Logged In
                </h2>
                <p className="text-slate-500 mb-6">
                  Please login to view your dashboard and account information.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white 
                           rounded-lg hover:bg-indigo-700 transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <FiLogIn className="h-4 w-4" />
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
