import { useAuthStore } from "@/store/authStore";
import {
  LayoutDashboard,
  ClipboardMinus,
  Users,
  MessageCircle,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      key: "dashboard",
      link: "/dashboard",
    },
    {
      icon: MessageCircle,
      label: "Patient Feedbacks",
      key: "feedbacks",
      link: "/feedback",
    },
    {
      icon: Users,
      label: "Manage Patients",
      key: "managePatients",
      link: "/managePatients",
    },
    {
      icon: Users,
      label: "Manage Staff",
      key: "manageStaff",
      link: "/manageStaff",
    },
    {
      icon: Bell,
      label: "Notifications",
      key: "notifications",
      link: "/notifications",
    },
    {
      icon: ClipboardMinus,
      label: "Report",
      key: "report",
      link: "/reports",
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col shadow-lg">
      {/* Logo/Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <div className="h-5 w-5 bg-white rounded"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ClinicFlow
            </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.key}>
              <Link to={item.link ?? "/"}>
                <button
                  onClick={() =>
                    item.submenu
                      ? toggleMenu(item.key)
                      : handleItemClick(item.key)
                  }
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                    activeItem === item.key
                      ? "bg-emerald-100 text-emerald-700 font-medium shadow-sm"
                      : "text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon
                      className={`h-5 w-5 ${
                        activeItem === item.key
                          ? "text-emerald-600"
                          : "text-gray-600"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                </button>
              </Link>
            </div>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-md transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
