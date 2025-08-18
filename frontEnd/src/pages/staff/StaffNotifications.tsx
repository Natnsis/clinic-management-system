import React, { useState } from "react";
import {
  Bell,
  Mail,
  Calendar as CalendarIcon,
  Clock,
  MessageCircle,
  AlertTriangle,
  ArchiveX,
  Search,
  FileText as FileTextIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StaffSidebar from "@/components/staff/StaffSidebar";

const StaffNotifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      title: "New Appointment Request",
      message:
        "John Doe has requested an appointment for a general checkup on June 25.",
      time: "2 minutes ago",
      read: false,
      priority: "normal",
      category: "appointment",
    },
    {
      id: 2,
      type: "reminder",
      title: "Appointment Confirmation Needed",
      message:
        "3 appointment requests are awaiting your confirmation for tomorrow.",
      time: "1 hour ago",
      read: false,
      priority: "high",
      category: "reminder",
    },
    {
      id: 3,
      type: "review",
      title: "Patient Record Review",
      message:
        "You have 5 patient records that require your review and signature.",
      time: "3 hours ago",
      read: true,
      priority: "normal",
      category: "review",
    },
    {
      id: 4,
      type: "message",
      title: "Message from Dr. Chen",
      message:
        "Dr. Michael Chen has sent you a message regarding patient Lisa Anderson's treatment plan.",
      time: "1 day ago",
      read: true,
      priority: "normal",
      category: "message",
    },
    {
      id: 5,
      type: "urgent",
      title: "Urgent: Lab Results Available",
      message:
        "Urgent lab results for patient Robert Johnson are now available for immediate review.",
      time: "2 days ago",
      read: true,
      priority: "urgent",
      category: "urgent",
    },
    {
      id: 6,
      type: "system",
      title: "System Maintenance Scheduled",
      message:
        "ClinicFlow will undergo scheduled maintenance on July 15 from 8 PM to 10 PM.",
      time: "5 days ago",
      read: true,
      priority: "low",
      category: "system",
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const archiveNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return CalendarIcon;
      case "reminder":
        return Clock;
      case "review":
        return FileTextIcon;
      case "message":
        return MessageCircle;
      case "urgent":
        return AlertTriangle;
      case "system":
        return Mail;
      default:
        return Mail;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "appointment":
        return "text-blue-600";
      case "reminder":
        return "text-orange-600";
      case "review":
        return "text-purple-600";
      case "message":
        return "text-green-600";
      case "urgent":
        return "text-red-600";
      case "system":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "appointment":
        return "bg-blue-100 text-blue-800";
      case "reminder":
        return "bg-orange-100 text-orange-800";
      case "review":
        return "bg-purple-100 text-purple-800";
      case "message":
        return "bg-green-100 text-green-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      case "system":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "unread") {
      return matchesSearch && !notif.read;
    } else if (activeTab === "read") {
      return matchesSearch && notif.read;
    } else {
      return matchesSearch;
    }
  });

  const hasUnread = notifications.some((notif) => !notif.read);

  return (
    <div className="min-h-screen bg-amber-50">
      <StaffSidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Bell className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-bold text-amber-900">Notifications</h1>
          </div>
          <p className="text-amber-700">
            Stay updated with important clinic information and alerts
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Total Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {notifications.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Unread
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {notifications.filter((n) => !n.read).length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Urgent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {notifications.filter((n) => n.priority === "urgent").length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {notifications.filter((n) => n.category === "message").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
                <Input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {hasUnread && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-amber-600 border-amber-200 hover:bg-amber-50"
                >
                  Mark All as Read
                </Button>
              )}
            </div>
          </CardHeader>

          <div className="border-b border-amber-100">
            <div className="flex space-x-2 px-6">
              {[
                { key: "all", label: "All", count: notifications.length },
                {
                  key: "unread",
                  label: "Unread",
                  count: notifications.filter((n) => !n.read).length,
                },
                {
                  key: "read",
                  label: "Read",
                  count: notifications.filter((n) => n.read).length,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.key
                      ? "border-amber-500 text-amber-700"
                      : "border-transparent text-amber-500 hover:text-amber-700"
                  }`}
                >
                  {tab.label}{" "}
                  {tab.count > 0 && (
                    <span className="ml-1 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <CardContent className="p-0">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-amber-900 mb-2">
                  No notifications found
                </h3>
                <p className="text-amber-700">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-amber-100">
                {filteredNotifications.map((notification) => {
                  const Icon = getIcon(notification.type);

                  return (
                    <div
                      key={notification.id}
                      className={`p-6 cursor-pointer transition-all duration-200 ${
                        notification.read
                          ? "bg-white"
                          : "bg-amber-50 border-l-4 border-amber-500"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div
                            className={`h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon
                              className={`h-5 w-5 ${getIconColor(
                                notification.type
                              )}`}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3
                                className={`text-sm font-semibold ${
                                  notification.read
                                    ? "text-amber-900"
                                    : "text-amber-700 font-medium"
                                }`}
                              >
                                {notification.title}
                              </h3>
                              <Badge
                                variant="secondary"
                                className={getCategoryColor(
                                  notification.category
                                )}
                              >
                                {notification.category}
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

                            <p className="text-sm text-amber-800 mb-2 line-clamp-2">
                              {notification.message}
                            </p>

                            <div className="flex items-center space-x-4 text-sm text-amber-600">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffNotifications;
