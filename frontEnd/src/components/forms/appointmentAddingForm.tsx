import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Search,
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StaffSidebar from "@/components/staff/StaffSidebar";
import { Link } from "react-router-dom";
import { useAppointmentStore, usePatientStore } from "@/store/overallStore";
import { useAuthStore } from "@/store/authStore";

type Patient = {
  id: string;
  fName: string;
  lName: string;
  studentId: string;
  password: string;
  email: string;
  lastVisit: string;
  createdAt: string;
};

const AppointmentAddingForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("General Checkup");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchPatients = usePatientStore((state) => state.fetchItems);
  const patients = usePatientStore((state) => state.items) as Patient[];
  const addAppointment = useAppointmentStore((state) => state.addItem);
  const userData = useAuthStore((state) => state.user);
  const staffId = userData!.userId;
  console.log(staffId);
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const appointmentTypes = [
    "General Checkup",
    "Follow-up",
    "Consultation",
    "Physical Exam",
    "Review",
    "Specialist Referral",
    "Mental Health Session",
  ];

  const availableTimes = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !selectedDate || !selectedTime) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const newAppointment = {
        patientId: selectedPatient.id,
        staffId,
        reason: reason || "N/A",
        type: appointmentType,
        note: notes,
        date: selectedDate,
        time: selectedTime,
      };
      console.log(newAppointment);

      await addAppointment(newAppointment);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);

      // reset
      setSelectedPatient(null);
      setSelectedDate("");
      setSelectedTime("");
      setAppointmentType("General Checkup");
      setReason("");
      setNotes("");
      setSearchTerm("");
    } catch (err) {
      console.error("Failed to schedule appointment", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <StaffSidebar />

      <div className="ml-64 p-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/appointmentSchedule">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-amber-700 hover:text-amber-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Schedule</span>
            </Button>
          </Link>
        </div>

        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Plus className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-bold text-amber-900">
              Schedule New Appointment
            </h1>
          </div>
          <p className="text-amber-700">Book an appointment for a patient</p>
        </header>

        {showSuccess && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
            <Check className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="text-green-800 font-medium">
                Appointment scheduled successfully!
              </p>
              <p className="text-green-700 text-sm">
                The appointment has been added to the calendar.
              </p>
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Patient Search */}
              <div>
                <Label>Select Patient</Label>
                <div className="relative mt-2 mb-4">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
                  <Input
                    type="text"
                    placeholder="Search patients by name or ID "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto pr-2">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedPatient?.id === patient.id
                          ? "border-amber-500 bg-amber-50"
                          : "border-amber-200 hover:border-amber-300 hover:bg-amber-25"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 ring-2 ring-amber-200">
                          <AvatarFallback>
                            {patient.fName[0]}
                            {patient.lName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-amber-900">
                            {patient.fName} {patient.lName}
                          </h3>
                          <p className="text-sm text-amber-700">
                            ID: {patient.studentId}
                          </p>
                        </div>
                        {selectedPatient?.id === patient.id && (
                          <Check className="h-5 w-5 text-amber-600 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <Label htmlFor="date">Select Date</Label>
                <div className="relative mt-2">
                  <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div>
                <Label>Select Time</Label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2 max-h-64 overflow-y-auto">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className={`h-12 ${
                        selectedTime === time
                          ? "bg-amber-600 hover:bg-amber-700"
                          : "border-amber-200 text-amber-700 hover:bg-amber-50"
                      }`}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="type">Appointment Type</Label>
                <select
                  id="type"
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="w-full p-2 border border-amber-200 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {appointmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reason & Notes */}
              <div>
                <Label htmlFor="reason">Reason (Optional)</Label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-amber-200 rounded-xl mt-2 focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-amber-200 rounded-xl mt-2 focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-6 border-t border-amber-200">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Confirm Appointment
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentAddingForm;
