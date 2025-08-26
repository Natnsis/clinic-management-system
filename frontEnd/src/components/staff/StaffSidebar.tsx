import React, { useState } from "react";
import {
  Calendar,
  Users,
  FileText,
  Bell,
  MessageCircle,
  User,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore"; // if you have the auth store

const StaffSidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const logout = useAuthStore((state) => state.logout); // if using Zustand
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      key: "appointments",
      link: "/staffDashboard",
    },
    {
      icon: Calendar,
      label: "Appointment Schedules",
      key: "appointments",
      link: "/appointmentSchedule",
    },
    {
      icon: Bell,
      label: "Notifications",
      key: "notifications",
      link: "/staffNotification",
    },
    {
      icon: Users,
      label: "Patient Lists",
      key: "patients",
      link: "/patientList",
    },
    {
      icon: FileText,
      label: "Patient Records",
      key: "records",
      link: "/patientRecords",
    },
    {
      icon: FileText,
      label: "Prescriptions",
      key: "prescriptions",
      link: "/staffPrescriptions",
    },
    {
      icon: MessageCircle,
      label: "Messages",
      key: "messages",
      link: "/staffMessages",
    },
    { icon: User, label: "Profile", key: "profile", link: "/staffProfile" },
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
                onClick={() => handleItemClick(item.key)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                  activeItem === item.key
                    ? "bg-amber-100 text-amber-700 font-medium shadow-sm"
                    : "text-amber-800 hover:bg-amber-50"
                }`}
              >
                <Link to={item.link}>
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
                </Link>
              </button>
            </div>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 mt-4 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-md transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
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
