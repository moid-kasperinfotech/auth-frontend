// Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUserPlus, FiLogIn, FiPhone } from "react-icons/fi";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register attempt:", registerData);
    // Add your registration logic here
    // On success: navigate('/login')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6">
            <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
              Create account
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Join us to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-6">
            <div className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="text"
                    type="name"
                    value={registerData.name}
                    name="name"
                    onChange={handleChanges}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl 
                             bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent transition-all
                             text-slate-800 placeholder-slate-400"
                    placeholder="john Doe"
                    required
                  />
                </div>
              </div>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={registerData.email}
                    name="email"
                    onChange={handleChanges}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl 
                             bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent transition-all
                             text-slate-800 placeholder-slate-400"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={registerData.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChanges}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl 
                             bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent transition-all
                             text-slate-800 placeholder-slate-400"
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={handleChanges}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl 
                             bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent transition-all
                             text-slate-800 placeholder-slate-400"
                    placeholder="Create a strong password"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 
                         text-white font-medium py-2.5 rounded-xl transition-all duration-200 
                         shadow-sm shadow-indigo-200 hover:shadow-md hover:shadow-indigo-300
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <FiUserPlus className="h-4 w-4" />
                Create Account
              </button>
            </div>
          </form>

          {/* Footer with Login Link */}
          <div className="px-8 pb-8 pt-4 border-t border-slate-100">
            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-700 
                         transition-colors inline-flex items-center gap-1"
              >
                Sign in
                <FiLogIn className="h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
        </div>

        {/* Subtle footer note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Join securely • Your data is protected
        </p>
      </div>
    </div>
  );
};

export default Register;
