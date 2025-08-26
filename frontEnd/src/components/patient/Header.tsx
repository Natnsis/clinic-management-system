import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  Calendar,
  Bell,
  User,
  LogOut,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/patientDashboard" },
    { icon: FileText, label: "Medical History", href: "/medicalHistory" },
    { icon: FileText, label: "Prescriptions", href: "/prescriptions" },
    { icon: Calendar, label: "Appointments", href: "/myAppointments" },
    {
      icon: MessageCircle,
      label: "Feedback",
      href: "/patientFeedback",
    },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-9 w-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ClinicFlow
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search appointments, records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Message Icon */}
            <Link to="/messages">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 relative transition-all duration-200"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                  3
                </span>
              </Button>
            </Link>

            {/* Notification Icon */}
            <Link to="/patientNotification">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 relative transition-all duration-200"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Avatar className="h-8 w-8 ring-2 ring-blue-100">
                  <AvatarImage alt="John Doe" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    JD
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700 hidden md:inline">
                  John Doe
                </span>
              </Button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50 animate-fade-in">
                  <a
                    href="/patient/profile"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded-lg mx-2 my-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-3 text-blue-600" />
                    Profile
                  </a>
                  <a
                    href="/patient/settings"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded-lg mx-2 my-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="h-4 w-4 mr-3 text-blue-600" />
                    Settings
                  </a>
                  <hr className="my-2 mx-2" />
                  <button
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors rounded-lg mx-2 my-1"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="h-6 w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block border-t border-gray-100">
          <div className="flex justify-between items-center py-2">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.href ?? "/"}
                className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  index === 0
                    ? "text-blue-600 bg-blue-50 font-medium shadow-sm"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-gray-100 py-2">
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded-lg mx-2 my-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3 text-blue-600" />
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
