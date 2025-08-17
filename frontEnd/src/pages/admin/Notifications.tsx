import React, { useState } from "react";
import {
  Bell,
  Mail,
  Users,
  Calendar as CalendarIcon,
  MessageCircle,
  Check,
  Clock,
  User,
  Star,
  AlertTriangle,
  Search,
  ArchiveX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/admin/Sidebar";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "New Patient Inquiry",
      message:
        "Dr. Johnson has sent a message regarding patient Sarah Wilson's test results.",
      sender: "Dr. Sarah Johnson",
      senderRole: "Physician",
      time: "2 minutes ago",
      read: false,
      priority: "normal",
      avatar: "SJ",
    },
    {
      id: 2,
      type: "appointment",
      title: "Upcoming Shift Reminder",
      message: "Your shift in the Emergency Department starts in 2 hours.",
      sender: "Staff Scheduler",
      senderRole: "System",
      time: "15 minutes ago",
      read: false,
      priority: "high",
      avatar: "SS",
    },
    {
      id: 3,
      type: "feedback",
      title: "New Patient Feedback",
      message:
        "Michael Chen has left a 5-star review for Dr. Anderson's consultation.",
      sender: "System Alert",
      senderRole: "Automated",
      time: "1 hour ago",
      read: true,
      priority: "normal",
      avatar: "SA",
    },
    {
      id: 4,
      type: "urgent",
      title: "Lab Results Available",
      message:
        "Urgent lab results for patient John Doe are now available for review.",
      sender: "Lab Department",
      senderRole: "Technician",
      time: "3 hours ago",
      read: true,
      priority: "urgent",
      avatar: "LD",
    },
    {
      id: 5,
      type: "message",
      title: "Staff Meeting Update",
      message:
        "The weekly staff meeting has been rescheduled to Friday at 3 PM.",
      sender: "Emily Rodriguez",
      senderRole: "Administrator",
      time: "5 hours ago",
      read: true,
      priority: "normal",
      avatar: "ER",
    },
    {
      id: 6,
      type: "system",
      title: "Software Update Available",
      message:
        "A new version of ClinicFlow is available. Click to learn more about the updates.",
      sender: "System",
      senderRole: "IT Department",
      time: "1 day ago",
      read: true,
      priority: "low",
      avatar: "IT",
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  // Archive notification
  const archiveNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    if (selectedNotification && selectedNotification.id === id) {
      setSelectedNotification(null);
    }
  };

  // Get icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case "message":
        return MessageCircle;
      case "appointment":
        return CalendarIcon;
      case "feedback":
        return Star;
      case "urgent":
        return AlertTriangle;
      default:
        return Mail;
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get type color
  const getTypeColor = (type) => {
    switch (type) {
      case "message":
        return "bg-blue-100 text-blue-800";
      case "appointment":
        return "bg-green-100 text-green-800";
      case "feedback":
        return "bg-yellow-100 text-yellow-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      case "system":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.sender.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "unread") {
      return matchesSearch && !notif.read;
    } else if (activeTab === "read") {
      return matchesSearch && notif.read;
    } else {
      return matchesSearch;
    }
  });

  // Check if there are unread notifications
  const hasUnread = notifications.some((notif) => !notif.read);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Bell className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          <p className="text-gray-600">
            Manage messages and alerts from staff members and system
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                <Bell className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Notifications
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Unread Messages
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter((n) => !n.read).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Urgent Alerts
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter((n) => n.priority === "urgent").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Staff Messages
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter((n) => n.type === "message").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
              {/* Controls */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-gray-200 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {hasUnread && (
                  <Button
                    variant="outline"
                    className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    onClick={markAllAsRead}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Mark All as Read
                  </Button>
                )}
              </div>

              {/* Tabs */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                    activeTab === "all"
                      ? "bg-emerald-100 text-emerald-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Bell
                      className={`h-5 w-5 ${
                        activeTab === "all"
                          ? "text-emerald-600"
                          : "text-gray-600"
                      }`}
                    />
                    <span>All Notifications</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === "all" ? "bg-emerald-200" : "bg-gray-200"
                    }`}
                  >
                    {notifications.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("unread")}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                    activeTab === "unread"
                      ? "bg-emerald-100 text-emerald-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Clock
                      className={`h-5 w-5 ${
                        activeTab === "unread"
                          ? "text-emerald-600"
                          : "text-gray-600"
                      }`}
                    />
                    <span>Unread</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === "unread" ? "bg-emerald-200" : "bg-gray-200"
                    }`}
                  >
                    {notifications.filter((n) => !n.read).length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("read")}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                    activeTab === "read"
                      ? "bg-emerald-100 text-emerald-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Check
                      className={`h-5 w-5 ${
                        activeTab === "read"
                          ? "text-emerald-600"
                          : "text-gray-600"
                      }`}
                    />
                    <span>Read</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === "read" ? "bg-emerald-200" : "bg-gray-200"
                    }`}
                  >
                    {notifications.filter((n) => n.read).length}
                  </span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Priority Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Urgent</span>
                    <span className="font-medium">
                      {
                        notifications.filter((n) => n.priority === "urgent")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">High</span>
                    <span className="font-medium">
                      {
                        notifications.filter((n) => n.priority === "high")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Normal</span>
                    <span className="font-medium">
                      {
                        notifications.filter((n) => n.priority === "normal")
                          .length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No notifications found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredNotifications.map((notification) => {
                    const Icon = getIcon(notification.type);
                    const isSelected =
                      selectedNotification &&
                      selectedNotification.id === notification.id;

                    return (
                      <div
                        key={notification.id}
                        className={`p-6 cursor-pointer transition-all duration-200 ${
                          notification.read
                            ? "bg-white"
                            : "bg-emerald-50 border-l-4 border-emerald-500"
                        } ${
                          isSelected
                            ? "ring-2 ring-emerald-200 rounded-tr-none rounded-br-none"
                            : ""
                        }`}
                        onClick={() => {
                          markAsRead(notification.id);
                          setSelectedNotification(notification);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div
                              className={`h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0`}
                            >
                              <Icon className="h-5 w-5 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3
                                  className={`text-sm font-semibold ${
                                    notification.read
                                      ? "text-gray-900"
                                      : "text-emerald-700 font-medium"
                                  }`}
                                >
                                  {notification.title}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className={getTypeColor(notification.type)}
                                >
                                  {notification.type.charAt(0).toUpperCase() +
                                    notification.type.slice(1)}
                                </Badge>
                                <Badge
                                  variant="secondary"
                                  className={getPriorityColor(
                                    notification.priority
                                  )}
                                >
                                  {notification.priority}
                                </Badge>
                              </div>

                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {notification.message}
                              </p>

                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {notification.sender}
                                  <span className="mx-1">•</span>
                                  {notification.senderRole}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {notification.time}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                archiveNotification(notification.id);
                              }}
                            >
                              <ArchiveX className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
