// Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { identifier, password } = loginData;
  if (!identifier || !password) return;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", loginData);
    // Add your login logic here
    try {
      const res = await login(identifier, password);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6">
            <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
              Welcome back
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-6">
            <div className="space-y-5">
              {/* Identifier Field */}
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Email or Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="identifier"
                    type="text"
                    value={loginData.identifier}
                    name="identifier"
                    onChange={handleChanges}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl 
                             bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent transition-all
                             text-slate-800 placeholder-slate-400"
                    placeholder="john@example.com or +1234567890"
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
                    value={loginData.password}
                    onChange={handleChanges}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl 
                             bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent transition-all
                             text-slate-800 placeholder-slate-400"
                    placeholder="••••••••"
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
                <FiLogIn className="h-4 w-4" />
                Sign In
              </button>
            </div>
          </form>

          {/* Footer with Register Link */}
          <div className="px-8 pb-8 pt-4 border-t border-slate-100">
            <p className="text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-700 
                         transition-colors inline-flex items-center gap-1"
              >
                Create account
                <FiUserPlus className="h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
        </div>

        {/* Subtle footer note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Secure login • Protected by industry standards
        </p>
      </div>
    </div>
  );
};

export default Login;
