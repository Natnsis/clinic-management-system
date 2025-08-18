import React, { useState } from "react";
import {
  Calendar,
  Search,
  Clock,
  CheckCircle,
  User,
  MapPin,
  Phone,
  MessageCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/patient/Header";

const MyAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("upcoming");
  const [filterType, setFilterType] = useState("all");

  // Mock appointment data
  const appointments = [
    {
      id: 1,
      type: "General Checkup",
      doctor: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      date: "June 20, 2023",
      time: "10:30 AM",
      status: "confirmed",
      location: "Main Clinic - Room 3",
      phone: "+1 (555) 123-4567",
      reason: "Annual physical examination",
      notes: "Please arrive 15 minutes early for paperwork.",
    },
    {
      id: 2,
      type: "Dental Exam",
      doctor: "Dr. Michael Chen",
      specialty: "Dentistry",
      date: "June 25, 2023",
      time: "2:15 PM",
      status: "pending",
      location: "Dental Clinic - Room 1",
      phone: "+1 (555) 234-5678",
      reason: "Routine dental cleaning",
      notes: "Bring your student ID for verification.",
    },
    {
      id: 3,
      type: "Follow-up",
      doctor: "Dr. Emily Rodriguez",
      specialty: "Mental Health",
      date: "May 10, 2023",
      time: "11:00 AM",
      status: "completed",
      location: "Counseling Center - Room 2",
      phone: "+1 (555) 345-6789",
      reason: "Follow-up on anxiety management",
      notes: "Progress looks good. Continue with current treatment plan.",
    },
    {
      id: 4,
      type: "Physical Therapy",
      doctor: "Dr. James Taylor",
      specialty: "Physical Therapy",
      date: "April 15, 2023",
      time: "3:00 PM",
      status: "completed",
      location: "Rehabilitation Center - Room 1",
      phone: "+1 (555) 456-7890",
      reason: "Shoulder injury rehabilitation",
      notes: "Exercises progressing well. Continue home exercises.",
    },
  ];

  const appointmentTypes = [
    "all",
    "checkup",
    "dental",
    "therapy",
    "follow-up",
    "specialist",
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "upcoming" &&
        ["confirmed", "pending"].includes(appointment.status)) ||
      (filterStatus === "completed" && appointment.status === "completed");

    const matchesType =
      filterType === "all" ||
      (appointment.type.toLowerCase().includes("checkup") &&
        filterType === "checkup") ||
      (appointment.type.toLowerCase().includes("dental") &&
        filterType === "dental") ||
      (appointment.type.toLowerCase().includes("therapy") &&
        filterType === "therapy") ||
      (appointment.type.toLowerCase().includes("follow-up") &&
        filterType === "follow-up");

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    return status === "confirmed"
      ? "bg-green-100 text-green-800"
      : status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-800";
  };

  const getTypeColor = (type) => {
    if (type.toLowerCase().includes("dental")) {
      return "bg-blue-100 text-blue-800";
    } else if (type.toLowerCase().includes("therapy")) {
      return "bg-purple-100 text-purple-800";
    } else if (type.toLowerCase().includes("follow-up")) {
      return "bg-orange-100 text-orange-800";
    } else if (type.toLowerCase().includes("checkup")) {
      return "bg-green-100 text-green-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const upcomingCount = appointments.filter((a) =>
    ["confirmed", "pending"].includes(a.status)
  ).length;
  const completedCount = appointments.filter(
    (a) => a.status === "completed"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-16">
        {" "}
        {/* Offset for fixed header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                My Appointments
              </h1>
            </div>
            <p className="text-gray-600">
              Manage your scheduled visits and upcoming appointments
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {appointments.length}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {upcomingCount}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {completedCount}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-orange-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Next Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {appointments
                    .filter((a) => ["confirmed", "pending"].includes(a.status))
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .length > 0
                    ? new Date(
                        appointments
                          .filter((a) =>
                            ["confirmed", "pending"].includes(a.status)
                          )
                          .sort(
                            (a, b) => new Date(a.date) - new Date(b.date)
                          )[0].date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "None"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search appointments by type, doctor, or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                {appointmentTypes
                  .filter((t) => t !== "all")
                  .map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
              </select>

              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Schedule Appointment</span>
              </Button>
            </div>
          </div>

          {/* Appointments List */}
          <div className="space-y-6">
            {filteredAppointments.length === 0 ? (
              <Card className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No appointments found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Your First Appointment
                </Button>
              </Card>
            ) : (
              filteredAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3 mb-4">
                          <div
                            className={`h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0`}
                          >
                            <Calendar className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {appointment.type}
                              </h3>
                              <Badge
                                variant="secondary"
                                className={getTypeColor(appointment.type)}
                              >
                                {appointment.specialty}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className={getStatusColor(appointment.status)}
                              >
                                {appointment.status}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                with {appointment.doctor}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {appointment.date} at {appointment.time}
                              </div>
                            </div>

                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Location
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {appointment.location}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-2 mt-2">
                                <Phone className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Contact
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {appointment.phone}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-900 mb-1">
                                Reason for Visit
                              </p>
                              <p className="text-sm text-gray-700">
                                {appointment.reason}
                              </p>
                            </div>

                            {appointment.notes && (
                              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start space-x-2">
                                  <MessageCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-medium text-blue-800 mb-1">
                                      Notes
                                    </p>
                                    <p className="text-sm text-blue-700">
                                      {appointment.notes}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 mt-6 lg:mt-0 lg:ml-6">
                        {appointment.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-200 text-green-700 hover:bg-green-50"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Confirm
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-600"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message Doctor
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-600"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
