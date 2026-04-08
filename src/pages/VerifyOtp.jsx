import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axiosInstance";
import { toast } from "react-hot-toast";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const tempUserId = state?.tempUserId;

  // ❗ safety (direct access block)
  if (!tempUserId) {
    navigate("/register");
  }

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/verify", {
        tempUserId,
        otp,
      });

      toast.success(res?.data?.data?.message || "Account created");

      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-center tracking-widest"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;