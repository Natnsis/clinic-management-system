import React, { useState } from "react";
import {
  Calendar,
  Users,
  MessageCircle,
  FileText,
  Bell,
  Settings,
  Search,
  Filter,
  Download,
  MoreVertical,
  UserPlus,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  MessageSquare,
  User,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const stats = {
    totalPatients: 1247,
    newAppointments: 23,
    pendingFeedbacks: 8,
    activeStaff: 42,
  };

  const recentAppointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:30 AM",
      type: "General Checkup",
      status: "confirmed",
      doctor: "Dr. Smith",
    },
    {
      id: 2,
      patient: "Michael Chen",
      time: "10:15 AM",
      type: "Dental Exam",
      status: "pending",
      doctor: "Dr. Lee",
    },
    {
      id: 3,
      patient: "Emily Rodriguez",
      time: "11:00 AM",
      type: "Eye Test",
      status: "confirmed",
      doctor: "Dr. Brown",
    },
    {
      id: 4,
      patient: "David Wilson",
      time: "1:30 PM",
      type: "Physical Therapy",
      status: "cancelled",
      doctor: "Dr. Taylor",
    },
    {
      id: 5,
      patient: "Lisa Anderson",
      time: "2:45 PM",
      type: "Follow-up",
      status: "confirmed",
      doctor: "Dr. Smith",
    },
  ];

  const patientFeedbacks = [
    {
      id: 1,
      patient: "John Doe",
      rating: 5,
      comment: "Excellent service and very professional staff",
      date: "2023-06-15",
    },
    {
      id: 2,
      patient: "Jane Smith",
      rating: 4,
      comment: "Good experience, waiting time could be shorter",
      date: "2023-06-14",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      rating: 5,
      comment: "Dr. Smith is amazing! Highly recommend",
      date: "2023-06-13",
    },
  ];

  const users = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Physician",
      email: "sarah@clinic.com",
      status: "active",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Nurse",
      email: "michael@clinic.com",
      status: "active",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Receptionist",
      email: "emily@clinic.com",
      status: "active",
      avatar: "ER",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Technician",
      email: "david@clinic.com",
      status: "inactive",
      avatar: "DW",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Administrator",
      email: "lisa@clinic.com",
      status: "active",
      avatar: "LA",
    },
    {
      id: 6,
      name: "James Taylor",
      role: "Physician",
      email: "james@clinic.com",
      status: "active",
      avatar: "JT",
    },
    {
      id: 7,
      name: "Jennifer Lee",
      role: "Nurse",
      email: "jennifer@clinic.com",
      status: "active",
      avatar: "JL",
    },
    {
      id: 8,
      name: "Robert Kim",
      role: "Technician",
      email: "robert@clinic.com",
      status: "active",
      avatar: "RK",
    },
  ];

  const StatCard = ({ title, value, icon: Icon, trend, color = "emerald" }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">
                {trend}% from last month
              </span>
            </div>
          )}
        </div>
        <div
          className={`h-12 w-12 bg-${color}-100 rounded-xl flex items-center justify-center`}
        >
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const UserTable = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
              <Filter className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {user.avatar}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-emerald-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">8</span> of{" "}
          <span className="font-medium">8</span> results
        </p>
        <div className="flex space-x-1">
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Patients"
                value={stats.totalPatients}
                icon={Users}
                trend="12"
              />
              <StatCard
                title="New Appointments"
                value={stats.newAppointments}
                icon={Calendar}
                trend="8"
                color="teal"
              />
              <StatCard
                title="Pending Feedbacks"
                value={stats.pendingFeedbacks}
                icon={MessageCircle}
                trend="15"
                color="blue"
              />
              <StatCard
                title="Active Staff"
                value={stats.activeStaff}
                icon={Shield}
                trend="5"
                color="purple"
              />
            </div>

            {/* Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Appointments */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Appointments
                </h3>
                <div className="space-y-4">
                  {recentAppointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            appt.status === "confirmed"
                              ? "bg-green-500"
                              : appt.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {appt.patient}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appt.time} • {appt.type}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          appt.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : appt.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Feedbacks */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Feedback
                </h3>
                <div className="space-y-4">
                  {patientFeedbacks.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">
                          {feedback.patient}
                        </p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < feedback.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {feedback.comment}
                      </p>
                      <p className="text-xs text-gray-400">{feedback.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "appointments":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Appointments Management
              </h3>
              <p className="text-gray-600">
                Manage all clinic appointments and scheduling here.
              </p>
            </div>
          </div>
        );

      case "feedbacks":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Patient Feedbacks
              </h3>
              <p className="text-gray-600">
                View and respond to patient feedback and reviews.
              </p>
            </div>
          </div>
        );

      case "audit":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Audit Logs
              </h3>
              <p className="text-gray-600">
                Track all system activities and user actions.
              </p>
            </div>
          </div>
        );

      case "patients":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Manage Patients
              </h3>
              <p className="text-gray-600">
                Add, edit, and manage patient records.
              </p>
            </div>
          </div>
        );

      case "staff":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Manage Staff
                </h3>
                <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  <UserPlus className="h-4 w-4" />
                  <span>Add Staff</span>
                </button>
              </div>
              <UserTable />
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notifications
              </h3>
              <p className="text-gray-600">
                Manage system notifications and alerts.
              </p>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Settings
              </h3>
              <p className="text-gray-600">
                Configure system settings and preferences.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Clinic Management Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, Administrator</p>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
