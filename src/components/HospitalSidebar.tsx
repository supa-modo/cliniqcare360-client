import { NavLink, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import {
  TbPresentationAnalytics,
  TbHelp,
  TbUserHeart,
  TbCalendarEvent,
  TbStethoscope,
  TbPill,
  TbCreditCard,
} from "react-icons/tb";
import {
  MdSpaceDashboard,
  MdHealthAndSafety,
  MdPeople,
  MdLocalHospital,
  MdScience,
} from "react-icons/md";
import {
  PiGearBold,
  PiUsersDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { RiUserFollowLine, RiUserStarLine } from "react-icons/ri";
import { FaUserMd, FaUserNurse } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { GiMedicines } from "react-icons/gi";

// Role-based navigation items for Cliniq Care360
const getNavItems = (userRole: string) => {
  const baseItems = [
    {
      category: null,
      items: [
        {
          name: "Dashboard",
          icon: MdSpaceDashboard,
          path: "/dashboard",
          end: true,
          roles: ["Admin", "Doctor", "Nurse"],
        },
      ],
    },
  ];

  // Admin-specific items
  const adminItems = [
    {
      category: "Patient Management",
      items: [
        {
          name: "All Patients",
          icon: PiUsersThreeDuotone,
          path: "/patients",
          roles: ["Admin"],
        },
        {
          name: "Patient Registration",
          icon: TbUserHeart,
          path: "/patients/register",
          roles: ["Admin"],
        },
        {
          name: "Patient Search",
          icon: RiUserFollowLine,
          path: "/patients/search",
          roles: ["Admin"],
        },
      ],
    },
    {
      category: "Staff Management",
      items: [
        {
          name: "All Staff",
          icon: PiUsersDuotone,
          path: "/staff",
          roles: ["Admin"],
        },
        {
          name: "Doctors",
          icon: FaUserMd,
          path: "/staff/doctors",
          roles: ["Admin"],
        },
        {
          name: "Nurses",
          icon: FaUserNurse,
          path: "/staff/nurses",
          roles: ["Admin"],
        },
      ],
    },
    {
      category: "System Management",
      items: [
        {
          name: "Appointments",
          icon: TbCalendarEvent,
          path: "/appointments",
          roles: ["Admin"],
        },
        {
          name: "Laboratory",
          icon: MdScience,
          path: "/laboratory",
          roles: ["Admin"],
        },
        {
          name: "Pharmacy",
          icon: GiMedicines,
          path: "/pharmacy",
          roles: ["Admin"],
        },
        {
          name: "Billing",
          icon: TbCreditCard,
          path: "/billing",
          roles: ["Admin"],
        },
      ],
    },
  ];

  // Doctor-specific items
  const doctorItems = [
    {
      category: "Clinical",
      items: [
        {
          name: "My Patients",
          icon: MdPeople,
          path: "/doctor/patients",
          roles: ["Doctor"],
        },
        {
          name: "Appointments",
          icon: TbCalendarEvent,
          path: "/doctor/appointments",
          roles: ["Doctor"],
        },
        {
          name: "Clinical Encounters",
          icon: TbStethoscope,
          path: "/doctor/encounters",
          roles: ["Doctor"],
        },
        {
          name: "Prescriptions",
          icon: TbPill,
          path: "/doctor/prescriptions",
          roles: ["Doctor"],
        },
      ],
    },
    {
      category: null,
      items: [
        {
          name: "Lab Orders",
          icon: MdScience,
          path: "/doctor/lab-orders",
          roles: ["Doctor"],
        },
        {
          name: "Imaging Orders",
          icon: MdLocalHospital,
          path: "/doctor/imaging",
          roles: ["Doctor"],
        },
      ],
    },
  ];

  // Nurse-specific items
  const nurseItems = [
    {
      category: "Patient Care",
      items: [
        {
          name: "My Patients",
          icon: MdPeople,
          path: "/nurse/patients",
          roles: ["Nurse"],
        },
        {
          name: "Triage",
          icon: MdHealthAndSafety,
          path: "/nurse/triage",
          roles: ["Nurse"],
        },
        {
          name: "Vital Signs",
          icon: TbStethoscope,
          path: "/nurse/vitals",
          roles: ["Nurse"],
        },
        {
          name: "Medication Administration",
          icon: TbPill,
          path: "/nurse/medications",
          roles: ["Nurse"],
        },
      ],
    },
    {
      category: null,
      items: [
        {
          name: "Patient Monitoring",
          icon: RiUserStarLine,
          path: "/nurse/monitoring",
          roles: ["Nurse"],
        },
      ],
    },
  ];

  // Common items for all roles
  const commonItems = [
    {
      category: null,
      items: [
        {
          name: "Reports",
          icon: TbPresentationAnalytics,
          path: "/reports",
          roles: ["Admin", "Doctor", "Nurse"],
        },
        {
          name: "Settings",
          icon: PiGearBold,
          path: "/settings",
          roles: ["Admin", "Doctor", "Nurse"],
        },
        {
          name: "Help & Support",
          icon: TbHelp,
          path: "/support",
          roles: ["Admin", "Doctor", "Nurse"],
        },
      ],
    },
  ];

  // Filter items based on user role
  const filterItemsByRole = (items: any[]) => {
    return items
      .map((category: any) => ({
        ...category,
        items:
          category.items?.filter((item: any) =>
            item.roles?.includes(userRole)
          ) || [],
      }))
      .filter((category: any) => !category.items || category.items.length > 0);
  };

  // Combine all items based on role
  let allItems: any[] = [...baseItems];

  if (userRole === "Admin") {
    allItems = [...allItems, ...adminItems, ...commonItems];
  } else if (userRole === "Doctor") {
    allItems = [...allItems, ...doctorItems, ...commonItems];
  } else if (userRole === "Nurse") {
    allItems = [...allItems, ...nurseItems, ...commonItems];
  }

  return filterItemsByRole(allItems);
};

const HospitalSidebar = ({ collapsed = false }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = getNavItems(user?.role || "Admin");

  return (
    <aside
      className={`flex flex-col bg-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border-r border-slate-300/50 dark:border-slate-700/50 font-inter transition-all duration-500 ease-in-out shadow-2xl ${
        collapsed ? "w-20" : "w-[310px]"
      }`}
    >
      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto pt-2.5 pb-3 scrollbar-hidden">
        {/* logo/title */}
        <div className="transition-all duration-500 ease-in-out">
          {collapsed ? (
            <div className="flex flex-col items-center mb-3">
              {/* Cliniq logo */}
              <img src="/logo.png" alt="Cliniq Logo" className="w-14 h-14" />
            </div>
          ) : (
            <div className="flex items-center pl-6 pr-4 mb-1.5">
              <div className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Cliniq Logo"
                  className="w-14 h-14 mr-2"
                />

                <div>
                  <h1 className="font-bold text-slate-800 dark:text-white text-base tracking-wide">
                    Cliniq Care360
                  </h1>
                  <p className="text-slate-600 dark:text-primary-400 text-xs font-medium">
                    Hospital Management System
                  </p>
                </div>
              </div>
            </div>
          )}
          <hr className="border-slate-500 dark:border-slate-700/50 mx-6" />
        </div>

        {/* Navigation */}
        <nav className="transition-all duration-500 ease-in-out pt-4">
          {navItems.map((category, index) => (
            <div key={index} className="px-3">
              {/* Category label */}
              {category.category && !collapsed && (
                <div className="text-[0.65rem] uppercase tracking-wider text-slate-600 dark:text-primary-400 font-semibold px-4 py-2 transition-opacity duration-300">
                  {category.category}
                </div>
              )}
              {/* Category items */}
              <div className="space-y-1">
                {category.items.map((item: any) => {
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.end}
                      className={({ isActive }) =>
                        `group relative flex items-center ${
                          collapsed ? "px-3 py-2.5" : "px-4 py-2"
                        } rounded-lg transition-all duration-200 gap-3
                        ${
                          isActive
                            ? "bg-gradient-to-r from-primary-600/90 to-primary-700/90 text-white font-semibold"
                            : "text-slate-700 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-secondary-100 dark:hover:bg-slate-700"
                        }`
                      }
                      title={collapsed ? item.name : undefined}
                    >
                      <item.icon
                        className={`flex-shrink-0 transition-all duration-200 ${
                          collapsed
                            ? "h-[1.65rem] w-[1.65rem]"
                            : "h-[1.45rem] w-[1.45rem]"
                        } group-hover:text-secondary-500 dark:group-hover:text-secondary-500`}
                      />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium transition-opacity duration-300">
                            {item.name}
                          </span>
                        </div>
                      )}
                      {/* Active indicator */}
                      {!collapsed && (
                        <div className="w-2 h-2 rounded-full bg-secondary-500 dark:bg-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </NavLink>
                  );
                })}
              </div>
              {/* Category separator */}
              {index < navItems.length - 1 && (
                <div
                  className={`${
                    collapsed ? "mx-3" : "mx-4"
                  } my-4 border-t border-slate-500/50 dark:border-slate-700/50 transition-all duration-300`}
                ></div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom section with logout */}
      <div className="border-t border-slate-500/40 dark:border-slate-700/50 px-3 py-2 transition-all duration-300 ease-in-out">
        <div className="rounded-lg bg-secondary-600 dark:bg-slate-800/60 backdrop-blur-sm p-0.5 border border-slate-300/50 dark:border-slate-700/50">
          <button
            onClick={handleLogout}
            className={`flex w-full justify-center items-center rounded-[0.4rem] ${
              !collapsed ? "px-4 space-x-3" : "px-0 justify-center"
            } py-2.5 text-left text-sm font-medium text-white hover:bg-secondary-800 hover:text-white transition-all duration-200`}
          >
            <LuLogOut className="w-5 h-5" />
            {!collapsed && (
              <span className="transition-opacity duration-300">Logout</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default HospitalSidebar;
