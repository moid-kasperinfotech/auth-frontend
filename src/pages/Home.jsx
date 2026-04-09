import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successful");
    navigate("/", { replace: true });
  };

  // ✅ GLOBAL LOADING SCREEN (no flicker)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-semibold">MyApp</h1>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg text-center">
          {isAuthenticated ? (
            <>
              <h2 className="text-2xl font-semibold mb-2">Welcome back 👋</h2>
              <p className="text-gray-600 mb-4">Glad to see you again!</p>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-sm text-gray-500">User Info</p>
                <p className="font-medium mt-1">{user?.user?.name || "User"}</p>
                <p className="text-sm text-gray-600">
                  {user?.user?.email || "No Email"}
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-2">
                Welcome to MyApp 🚀
              </h2>
              <p className="text-gray-600 mb-6">
                Please login to access your dashboard and data.
              </p>

              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
