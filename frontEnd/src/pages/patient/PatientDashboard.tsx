import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/patient/Header";
import { useAuthStore } from "@/store/authStore";
import { useAppointmentStore, type Appointment } from "@/store/overallStore";
import { useStaffStore, type Staff } from "@/store/overallStore";

const PatientDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const patientId = user.userId;

  const fetchAppointments = useAppointmentStore((state) => state.fetchItems);
  const appointments = useAppointmentStore(
    (state) => state.items
  ) as Appointment[];

  const fetchStaff = useStaffStore((state) => state.fetchItems);
  const staffList = useStaffStore((state) => state.items) as Staff[];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchStaff();
      await fetchAppointments();
      setLoading(false);
    };
    fetchData();
  }, [fetchAppointments, fetchStaff]);

  // Safely filter appointments
  const upcomingAppointments = Array.isArray(appointments)
    ? appointments.filter((a) => a.patientId === patientId)
    : [];

  const getStaffName = (staffId: string) => {
    const staff = staffList.find((s) => s.id === staffId);
    return staff ? `${staff.fName} ${staff.lName}` : "Unknown Staff";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Upcoming Appointments</h1>

        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No upcoming appointments
            </h3>
            <p className="text-gray-500">
              You don't have any scheduled appointments.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="border-gray-200 hover:bg-gray-50"
              >
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>{appointment.type}</CardTitle>
                  <Badge
                    className={`${
                      appointment.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appointment.status || "Unknown"}
                  </Badge>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <p>Date: {new Date(appointment.date).toDateString()}</p>
                  <p>Time: {appointment.time}</p>
                  <p>Doctor: {getStaffName(appointment.staffId)}</p>
                  <p>Note: {appointment.note || "No notes"}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
