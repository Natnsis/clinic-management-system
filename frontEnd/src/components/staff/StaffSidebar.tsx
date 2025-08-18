import React, { useState } from "react";
import {
  Calendar,
  Users,
  FileText,
  Bell,
  MessageCircle,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const StaffSidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
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

  const menuItems = [
    {
      icon: Calendar,
      label: "Appointment Schedules",
      key: "appointments",
      link: "/staff/appointments",
    },
    {
      icon: Bell,
      label: "Notifications",
      key: "notifications",
      link: "/staff/notifications",
    },
    {
      icon: Users,
      label: "Patient Lists",
      key: "patients",
      link: "/staff/patients",
    },
    {
      icon: FileText,
      label: "Patient Records",
      key: "records",
      link: "/staff/records",
    },
    {
      icon: FileText,
      label: "Prescriptions",
      key: "prescriptions",
      link: "/staff/prescriptions",
    },
    {
      icon: MessageCircle,
      label: "Messages",
      key: "messages",
      link: "/staff/messages",
    },
    {
      icon: User,
      label: "Profile",
      key: "profile",
      link: "/staff/profile",
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-amber-200 flex flex-col shadow-lg">
      {/* Logo/Header */}
      <div className="flex items-center justify-center h-20 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
            <div className="h-5 w-5 bg-white rounded"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ClinicFlow
            </h1>
            <p className="text-xs text-amber-700">Staff Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.key}>
              <button
                onClick={() =>
                  item.submenu
                    ? toggleMenu(item.key)
                    : handleItemClick(item.key)
                }
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                  activeItem === item.key
                    ? "bg-amber-100 text-amber-700 font-medium shadow-sm"
                    : "text-amber-800 hover:bg-amber-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={`h-5 w-5 ${
                      activeItem === item.key
                        ? "text-amber-600"
                        : "text-amber-600"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.submenu && (
                  <div
                    className={`transition-transform duration-200 ${
                      openMenus[item.key] ? "rotate-180" : ""
                    }`}
                  >
                    {openMenus[item.key] ? (
                      <ChevronUp className="h-4 w-4 text-amber-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                )}
              </button>

              {/* Submenu */}
              {item.submenu && openMenus[item.key] && (
                <div className="mt-1 ml-4 space-y-1">
                  {item.submenu.map((subItem, index) => (
                    <a
                      key={index}
                      href={subItem.link}
                      className="block px-3 py-2 text-sm text-amber-700 hover:bg-amber-100 hover:text-amber-800 rounded-lg transition-colors"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-amber-200 bg-amber-50">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900">
              Dr. Sarah Johnson
            </p>
            <p className="text-xs text-amber-700">Physician</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffSidebar;
