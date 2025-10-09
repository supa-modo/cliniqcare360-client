import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  TbUsers,
  TbCalendarEvent,
  TbStethoscope,
  TbPill,
  TbCreditCard,
  TbPresentationAnalytics,
  TbUserHeart,
  TbFileText,
} from "react-icons/tb";
import { MdPeople, MdHealthAndSafety } from "react-icons/md";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  // Role-based quick actions
  const getQuickActions = () => {
    const commonActions = [
      {
        title: "View Reports",
        icon: TbPresentationAnalytics,
        path: "/reports",
        color: "bg-blue-500 hover:bg-blue-600",
      },
      {
        title: "Settings",
        icon: TbFileText,
        path: "/settings",
        color: "bg-gray-500 hover:bg-gray-600",
      },
    ];

    if (user.role === "Admin") {
      return [
        {
          title: "All Patients",
          icon: TbUsers,
          path: "/patients",
          color: "bg-green-500 hover:bg-green-600",
        },
        {
          title: "Staff Management",
          icon: MdPeople,
          path: "/staff",
          color: "bg-purple-500 hover:bg-purple-600",
        },
        {
          title: "Appointments",
          icon: TbCalendarEvent,
          path: "/appointments",
          color: "bg-orange-500 hover:bg-orange-600",
        },
        {
          title: "Billing",
          icon: TbCreditCard,
          path: "/billing",
          color: "bg-yellow-500 hover:bg-yellow-600",
        },
        ...commonActions,
      ];
    } else if (user.role === "Doctor") {
      return [
        {
          title: "My Patients",
          icon: TbUserHeart,
          path: "/doctor/patients",
          color: "bg-green-500 hover:bg-green-600",
        },
        {
          title: "Appointments",
          icon: TbCalendarEvent,
          path: "/doctor/appointments",
          color: "bg-orange-500 hover:bg-orange-600",
        },
        {
          title: "Clinical Encounters",
          icon: TbStethoscope,
          path: "/doctor/encounters",
          color: "bg-blue-500 hover:bg-blue-600",
        },
        {
          title: "Prescriptions",
          icon: TbPill,
          path: "/doctor/prescriptions",
          color: "bg-red-500 hover:bg-red-600",
        },
        ...commonActions,
      ];
    } else if (user.role === "Nurse") {
      return [
        {
          title: "My Patients",
          icon: TbUserHeart,
          path: "/nurse/patients",
          color: "bg-green-500 hover:bg-green-600",
        },
        {
          title: "Triage",
          icon: MdHealthAndSafety,
          path: "/nurse/triage",
          color: "bg-red-500 hover:bg-red-600",
        },
        {
          title: "Vital Signs",
          icon: TbStethoscope,
          path: "/nurse/vitals",
          color: "bg-blue-500 hover:bg-blue-600",
        },
        {
          title: "Medication Admin",
          icon: TbPill,
          path: "/nurse/medications",
          color: "bg-purple-500 hover:bg-purple-600",
        },
        ...commonActions,
      ];
    }

    return commonActions;
  };

  const quickActions = getQuickActions();

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-12">
          <div className="flex items-center space-x-4">
            <div className="text-6xl">{getRoleIcon(user.role)}</div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Hello, {user.full_name}!
              </h2>
              <p className="text-primary-100 text-lg">
                Welcome to Cliniq Care360 Dashboard
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
                <span className="text-gray-500 font-medium w-32">User ID:</span>
                <span className="text-gray-600 text-sm font-mono">
                  {user.id}
                </span>
              </div>
            </div>

            {/* System Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                System Status
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-800 font-medium">
                    Authentication
                  </span>
                  <span className="text-green-600">✅ Active</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-800 font-medium">Database</span>
                  <span className="text-green-600">✅ Connected</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="text-yellow-800 font-medium">Phase 1</span>
                  <span className="text-yellow-600">✅ Complete</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-blue-800 font-medium">Phase 2</span>
                  <span className="text-blue-600">🚧 In Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className={`flex items-center space-x-3 p-4 rounded-lg text-white transition-all duration-200 ${action.color}`}
            >
              <action.icon className="w-6 h-6" />
              <span className="font-medium">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Phase Status */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Implementation Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-green-800">Phase 1</h4>
              <span className="text-green-600">✅</span>
            </div>
            <p className="text-sm text-green-700">
              Authentication & Password Reset
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-blue-800">Phase 2</h4>
              <span className="text-blue-600">🚧</span>
            </div>
            <p className="text-sm text-blue-700">Patient Management</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">Phase 3</h4>
              <span className="text-gray-600">⏳</span>
            </div>
            <p className="text-sm text-gray-700">Appointments & Scheduling</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">Phase 4+</h4>
              <span className="text-gray-600">📋</span>
            </div>
            <p className="text-sm text-gray-700">Clinical & Beyond</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
