import React, { useState } from "react";
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

const AppointmentAddingForm = () => {
  const [step, setStep] = useState(1); // 1: Select Patient, 2: Select Date/Time, 3: Confirm
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("General Checkup");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock patient data
  const patients = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      studentId: "STU12345",
      department: "Computer Science",
      year: "3rd Year",
      avatar: "JD",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      studentId: "STU67890",
      department: "Engineering",
      year: "2nd Year",
      avatar: "JS",
    },
    {
      id: 3,
      firstName: "Robert",
      lastName: "Johnson",
      studentId: "STU11223",
      department: "Business",
      year: "4th Year",
      avatar: "RJ",
    },
    {
      id: 4,
      firstName: "Lisa",
      lastName: "Anderson",
      studentId: "STU44556",
      department: "Arts",
      year: "1st Year",
      avatar: "LA",
    },
    {
      id: 5,
      firstName: "Michael",
      lastName: "Chen",
      studentId: "STU77889",
      department: "Science",
      year: "3rd Year",
      avatar: "MC",
    },
    {
      id: 6,
      firstName: "Emily",
      lastName: "Rodriguez",
      studentId: "STU99001",
      department: "Medicine",
      year: "4th Year",
      avatar: "ER",
    },
  ];

  const appointmentTypes = [
    "General Checkup",
    "Follow-up",
    "Consultation",
    "Physical Exam",
    "Review",
    "Specialist Referral",
    "Mental Health Session",
  ];

  // Mock available time slots
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
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (step === 1 && !selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (step === 2 && (!selectedDate || !selectedTime)) {
      alert("Please select a date and time");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setStep(1);
        setSelectedPatient(null);
        setSelectedDate("");
        setSelectedTime("");
        setAppointmentType("General Checkup");
        setReason("");
        setNotes("");
      }, 3000);
    }, 1500);
  };

  const handleCancel = () => {
    // In a real app, this would navigate back
    console.log("Cancelling appointment scheduling");
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
              onClick={handleCancel}
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
            <div className="flex items-center justify-between">
              <CardTitle>Appointment Details</CardTitle>
              <div className="flex space-x-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= s
                        ? "bg-amber-600 text-white"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Select Patient */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
                    <Input
                      type="text"
                      placeholder="Search patients by name, ID, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
                    {filteredPatients.length === 0 ? (
                      <div className="col-span-full text-center py-8 text-amber-700">
                        No patients found matching your search criteria.
                      </div>
                    ) : (
                      filteredPatients.map((patient) => (
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
                              <AvatarFallback className="bg-amber-100 text-amber-600">
                                {patient.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-amber-900">
                                {patient.firstName} {patient.lastName}
                              </h3>
                              <p className="text-sm text-amber-700">
                                ID: {patient.studentId}
                              </p>
                              <p className="text-xs text-amber-600">
                                {patient.department} • {patient.year}
                              </p>
                            </div>
                            {selectedPatient?.id === patient.id && (
                              <Check className="h-5 w-5 text-amber-600 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Select Date and Time */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Select Date</Label>
                    <div className="relative">
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

                  <div className="space-y-2">
                    <Label>Select Time</Label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
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

                  <div className="space-y-2">
                    <Label htmlFor="type">Appointment Type</Label>
                    <select
                      id="type"
                      value={appointmentType}
                      onChange={(e) => setAppointmentType(e.target.value)}
                      className="w-full p-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {appointmentTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h3 className="font-semibold text-amber-900 mb-3">
                      Appointment Summary
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-amber-200">
                        <span className="text-amber-700">Patient:</span>
                        <span className="font-medium text-amber-900">
                          {selectedPatient?.firstName}{" "}
                          {selectedPatient?.lastName}
                        </span>
                      </div>

                      <div className="flex justify-between py-2 border-b border-amber-200">
                        <span className="text-amber-700">Student ID:</span>
                        <span className="font-medium text-amber-900">
                          {selectedPatient?.studentId}
                        </span>
                      </div>

                      <div className="flex justify-between py-2 border-b border-amber-200">
                        <span className="text-amber-700">Date & Time:</span>
                        <span className="font-medium text-amber-900">
                          {selectedDate} at {selectedTime}
                        </span>
                      </div>

                      <div className="flex justify-between py-2 border-b border-amber-200">
                        <span className="text-amber-700">Type:</span>
                        <span className="font-medium text-amber-900">
                          {appointmentType}
                        </span>
                      </div>

                      {reason && (
                        <div className="flex justify-between py-2 border-b border-amber-200">
                          <span className="text-amber-700">Reason:</span>
                          <span className="font-medium text-amber-900">
                            {reason}
                          </span>
                        </div>
                      )}

                      {notes && (
                        <div className="flex justify-between py-2">
                          <span className="text-amber-700">Notes:</span>
                          <span className="font-medium text-amber-900">
                            {notes}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Visit (Optional)</Label>
                    <textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Briefly describe the reason for the appointment..."
                      rows={3}
                      className="w-full p-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any additional information for the appointment..."
                      rows={3}
                      className="w-full p-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-between pt-6 border-t border-amber-200 mt-6">
                <div>
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="text-amber-700 border-amber-200 hover:bg-amber-50"
                    >
                      Back
                    </Button>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="text-amber-700 border-amber-200 hover:bg-amber-50"
                  >
                    Cancel
                  </Button>

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Next
                    </Button>
                  ) : (
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
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentAddingForm;
