import React, { useState } from "react";
import { Calendar, FileText, MessageCircle, Bell, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/patient/Header";

const PatientDashboard = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      type: "General Checkup",
      doctor: "Dr. Sarah Johnson",
      date: "June 20, 2023",
      time: "10:30 AM",
      status: "confirmed",
      location: "Main Clinic - Room 3",
    },
    {
      id: 2,
      type: "Dental Exam",
      doctor: "Dr. Michael Chen",
      date: "June 25, 2023",
      time: "2:15 PM",
      status: "pending",
      location: "Dental Clinic - Room 1",
    },
  ]);

  const [recentRecords, setRecentRecords] = useState([
    {
      id: 1,
      type: "General Checkup",
      date: "June 15, 2023",
      doctor: "Dr. Sarah Johnson",
      status: "Reviewed",
    },
    {
      id: 2,
      type: "Flu Symptoms",
      date: "May 10, 2023",
      doctor: "Dr. James Taylor",
      status: "Reviewed",
    },
  ]);

  const patientStats = {
    totalAppointments: 8,
    upcoming: 2,
    completed: 6,
    pendingFeedback: 1,
  };

  const nextAppointment = upcomingAppointments.find(
    (a) => a.status !== "completed"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-16">
        {" "}
        {/* Offset for fixed header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, John
            </h1>
            <p className="text-gray-600">
              Here's your health information and upcoming appointments
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {patientStats.totalAppointments}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {patientStats.upcoming}
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
                  {patientStats.completed}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-orange-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Pending Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {patientStats.pendingFeedback}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No upcoming appointments
                      </h3>
                      <p className="text-gray-500 mb-4">
                        You don't have any scheduled appointments.
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Appointment
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                              appointment.status === "confirmed"
                                ? "bg-green-100"
                                : appointment.status === "pending"
                                ? "bg-yellow-100"
                                : "bg-red-100"
                            }`}
                          >
                            <Calendar
                              className={`h-5 w-5 ${
                                appointment.status === "confirmed"
                                  ? "text-green-600"
                                  : appointment.status === "pending"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-900">
                                {appointment.type}
                              </h3>
                              <Badge
                                variant="secondary"
                                className={
                                  appointment.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : appointment.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              with {appointment.doctor}
                            </p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.date} at {appointment.time}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {appointment.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              {/* Next Appointment */}
              {nextAppointment && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Next Appointment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-4xl font-bold text-blue-900 mb-1">
                        {nextAppointment.date.split(" ")[1]}
                      </div>
                      <div className="text-sm text-blue-700 mb-2 uppercase tracking-wider">
                        {nextAppointment.date.split(" ")[0]}
                      </div>
                      <div className="font-semibold text-blue-900 mb-1">
                        {nextAppointment.type}
                      </div>
                      <div className="text-sm text-blue-700">
                        with {nextAppointment.doctor}
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        {nextAppointment.time}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-200"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Medical Records
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-200"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message to Doctor
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-200"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Manage Notifications
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Medical Records */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Records</CardTitle>
                  <CardDescription>Your latest medical visits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentRecords.slice(0, 2).map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <div className="font-medium text-sm text-gray-900">
                          {record.type}
                        </div>
                        <div className="text-xs text-gray-500">
                          {record.date}
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {record.status}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="link" className="p-0 h-auto font-normal">
                    View all records
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
