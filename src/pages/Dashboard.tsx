import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  const getRoleColor = (role: string): string => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800 border-red-300";
      case "Doctor":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Nurse":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getRoleIcon = (role: string): string => {
    switch (role) {
      case "Admin":
        return "👨‍💼";
      case "Doctor":
        return "👨‍⚕️";
      case "Nurse":
        return "👩‍⚕️";
      default:
        return "👤";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary-700">
                Cliniq Care360
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-12">
            <div className="flex items-center space-x-4">
              <div className="text-6xl">{getRoleIcon(user.role)}</div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Hello, {user.full_name}!
                </h2>
                <p className="text-primary-100 text-lg">
                  Welcome to your dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Information
                </h3>

                <div className="flex items-start">
                  <span className="text-gray-500 font-medium w-32">
                    Username:
                  </span>
                  <span className="text-gray-900">{user.username}</span>
                </div>

                <div className="flex items-start">
                  <span className="text-gray-500 font-medium w-32">Email:</span>
                  <span className="text-gray-900">{user.email}</span>
                </div>

                <div className="flex items-start">
                  <span className="text-gray-500 font-medium w-32">Role:</span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="text-gray-500 font-medium w-32">
                    User ID:
                  </span>
                  <span className="text-gray-600 text-sm font-mono">
                    {user.id}
                  </span>
                </div>
              </div>

              {/* Quick Stats or Actions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>

                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200">
                    <span className="text-gray-700 font-medium">
                      📊 View Reports
                    </span>
                  </button>

                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200">
                    <span className="text-gray-700 font-medium">
                      👥 Manage Patients
                    </span>
                  </button>

                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200">
                    <span className="text-gray-700 font-medium">
                      📅 Appointments
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="text-2xl mr-4">✅</div>
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-1">
                Authentication Successful
              </h3>
              <p className="text-green-700">
                You are successfully logged in and authorized to access this
                dashboard. Your session is secured with JWT tokens and
                role-based access control.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
