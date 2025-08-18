import React, { useState } from "react";
import { Calendar, Users, FileText, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import StaffSidebar from "@/components/staff/StaffSidebar";

const StaffDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

  // Mock data
  const stats = {
    todayAppointments: 8,
    pendingReviews: 3,
    activePatients: 42,
    newMessages: 5,
  };

  const todayAppointments = [
    {
      id: 1,
      patient: "John Doe",
      time: "9:30 AM",
      type: "General Checkup",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Jane Smith",
      time: "10:15 AM",
      type: "Follow-up",
      status: "confirmed",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      time: "11:00 AM",
      type: "Physical Exam",
      status: "pending",
    },
    {
      id: 4,
      patient: "Lisa Anderson",
      time: "1:30 PM",
      type: "Consultation",
      status: "confirmed",
    },
    {
      id: 5,
      patient: "Michael Chen",
      time: "2:45 PM",
      type: "Review",
      status: "confirmed",
    },
  ];

  const pendingReviews = [
    {
      id: 1,
      patient: "David Wilson",
      type: "Lab Results",
      time: "3 hours ago",
    },
    {
      id: 2,
      patient: "Emily Rodriguez",
      type: "Imaging Report",
      time: "5 hours ago",
    },
    {
      id: 3,
      patient: "James Taylor",
      type: "Specialist Referral",
      time: "1 day ago",
    },
  ];

  const StatCard = ({ title, value, icon: Icon, color = "amber" }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-amber-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div
          className={`h-12 w-12 bg-${color}-100 rounded-xl flex items-center justify-center`}
        >
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50">
      <StaffSidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-amber-900">Staff Dashboard</h1>
          <p className="text-amber-700">Welcome back, Dr. Johnson</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Today's Appointments"
            value={stats.todayAppointments}
            icon={Calendar}
            color="amber"
          />
          <StatCard
            title="Pending Reviews"
            value={stats.pendingReviews}
            icon={FileText}
            color="orange"
          />
          <StatCard
            title="Active Patients"
            value={stats.activePatients}
            icon={Users}
            color="brown"
          />
          <StatCard
            title="New Messages"
            value={stats.newMessages}
            icon={MessageCircle}
            color="yellow"
          />
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-amber-900">
                Today's Appointments
              </h3>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white text-sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {todayAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="flex items-center justify-between p-4 bg-amber-50 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        appt.status === "confirmed"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium text-amber-900">
                        {appt.patient}
                      </p>
                      <p className="text-sm text-amber-700">
                        {appt.time} • {appt.type}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      appt.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-amber-900">
                Pending Reviews
              </h3>
              <Button
                variant="outline"
                className="text-amber-700 border-amber-200 hover:bg-amber-50 text-sm"
              >
                Review All
              </Button>
            </div>
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="p-4 bg-orange-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-amber-900">
                      {review.patient}
                    </p>
                    <div className="flex">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                  </div>
                  <p className="text-sm text-amber-700 mb-2">{review.type}</p>
                  <p className="text-xs text-amber-600">{review.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="flex flex-col items-center justify-center py-6 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors">
              <Calendar className="h-6 w-6 text-amber-600 mb-2" />
              <span className="font-medium text-amber-900">
                Schedule Appointment
              </span>
            </Button>
            <Button className="flex flex-col items-center justify-center py-6 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors">
              <FileText className="h-6 w-6 text-orange-600 mb-2" />
              <span className="font-medium text-orange-900">
                Create Patient Record
              </span>
            </Button>
            <Button className="flex flex-col items-center justify-center py-6 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-xl transition-colors">
              <MessageCircle className="h-6 w-6 text-yellow-600 mb-2" />
              <span className="font-medium text-yellow-900">Send Message</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
