import { useState } from "react";
import {
  Calendar,
  Search,
  Clock,
  User,
  MessageCircle,
  Plus,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StaffSidebar from "@/components/staff/StaffSidebar";
import { Link } from "react-router-dom";

const AppointmentSchedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedDate, setSelectedDate] = useState("today");

  // Mock appointment data
  const appointments = [
    {
      id: 1,
      patient: "John Doe",
      patientId: "STU12345",
      type: "General Checkup",
      date: "2023-06-20",
      time: "9:30 AM",
      status: "confirmed",
      doctor: "Dr. Sarah Johnson",
      phone: "+1 (555) 123-4567",
      reason: "Annual physical examination",
      notes: "Patient has mild hypertension, monitor blood pressure.",
    },
    {
      id: 2,
      patient: "Jane Smith",
      patientId: "STU67890",
      type: "Follow-up",
      date: "2023-06-20",
      time: "10:15 AM",
      status: "confirmed",
      doctor: "Dr. Sarah Johnson",
      phone: "+1 (555) 234-5678",
      reason: "Follow-up on diabetes management",
      notes: "Blood sugar levels improving with current medication.",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      patientId: "STU11223",
      type: "Physical Exam",
      date: "2023-06-20",
      time: "11:00 AM",
      status: "pending",
      doctor: "Dr. Sarah Johnson",
      phone: "+1 (555) 345-6789",
      reason: "Pre-employment physical",
      notes: "Needs clearance for construction job.",
    },
    {
      id: 4,
      patient: "Lisa Anderson",
      patientId: "STU44556",
      type: "Consultation",
      date: "2023-06-20",
      time: "1:30 PM",
      status: "confirmed",
      doctor: "Dr. Sarah Johnson",
      phone: "+1 (555) 456-7890",
      reason: "Back pain consultation",
      notes: "MRI scheduled for next week.",
    },
    {
      id: 5,
      patient: "Michael Chen",
      patientId: "STU77889",
      type: "Review",
      date: "2023-06-20",
      time: "2:45 PM",
      status: "confirmed",
      doctor: "Dr. Sarah Johnson",
      phone: "+1 (555) 567-8901",
      reason: "Medication review",
      notes: "Adjust dosage of blood pressure medication.",
    },
  ];

  const appointmentTypes = [
    "all",
    "checkup",
    "follow-up",
    "consultation",
    "physical",
    "review",
  ];
  const dates = ["today", "tomorrow", "this-week", "next-week"];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || appointment.status === filterStatus;
    const matchesType =
      filterType === "all" ||
      appointment.type.toLowerCase().includes(filterType);

    // In a real app, this would filter by actual date
    const matchesDate = true;

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const getStatusColor = (status) => {
    return status === "confirmed"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const getTypeColor = (type) => {
    if (type.toLowerCase().includes("checkup")) {
      return "bg-blue-100 text-blue-800";
    } else if (type.toLowerCase().includes("follow-up")) {
      return "bg-purple-100 text-purple-800";
    } else if (type.toLowerCase().includes("consultation")) {
      return "bg-orange-100 text-orange-800";
    } else if (type.toLowerCase().includes("physical")) {
      return "bg-green-100 text-green-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const todayCount = appointments.filter(
    (a) => a.status !== "cancelled"
  ).length;
  const confirmedCount = appointments.filter(
    (a) => a.status === "confirmed"
  ).length;
  const pendingCount = appointments.filter(
    (a) => a.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-amber-50">
      <StaffSidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-bold text-amber-900">
              Appointment Schedule
            </h1>
          </div>
          <p className="text-amber-700">Manage and view patient appointments</p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {todayCount}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Confirmed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {confirmedCount}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-yellow-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Pending Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {pendingCount}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Available Slots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">6</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
              <Input
                type="text"
                placeholder="Search patients, appointment types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this-week">This Week</option>
              <option value="next-week">Next Week</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
            <Link to="/appointmentAddingForm">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Schedule Appointment</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {filteredAppointments.length === 0 ? (
            <Card className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-900 mb-2">
                No appointments found
              </h3>
              <p className="text-amber-700 mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
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
                        <Avatar className="h-10 w-10 ring-2 ring-amber-200">
                          <AvatarFallback className="bg-amber-100 text-amber-600">
                            {appointment.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-amber-900">
                              {appointment.patient}
                            </h3>
                            <Badge
                              variant="secondary"
                              className={getTypeColor(appointment.type)}
                            >
                              {appointment.type}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={getStatusColor(appointment.status)}
                            >
                              {appointment.status}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-amber-700">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.time}
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {appointment.doctor}
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1">🆔</span>
                              {appointment.patientId}
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm font-medium text-amber-900 mb-1">
                              Reason for Visit
                            </p>
                            <p className="text-sm text-amber-800">
                              {appointment.reason}
                            </p>
                          </div>

                          {appointment.notes && (
                            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <MessageCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-amber-800 mb-1">
                                    Notes
                                  </p>
                                  <p className="text-sm text-amber-700">
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-amber-600 border-amber-200 hover:bg-amber-50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-amber-600 border-amber-200 hover:bg-amber-50"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message Patient
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
  );
};

export default AppointmentSchedule;
