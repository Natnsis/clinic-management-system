import { useEffect, useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StaffSidebar from "@/components/staff/StaffSidebar";
import { Link } from "react-router-dom";
import {
  useAppointmentStore,
  usePatientStore,
  useStaffStore,
} from "@/store/overallStore";
import type { Appointment, Patient, Staff } from "@/store/overallStore";

const AppointmentSchedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedDate, setSelectedDate] = useState("today");
  const [loadingAll, setLoadingAll] = useState(true);

  const getAppointments = useAppointmentStore((s) => s.fetchItems);
  const appointmentsList = useAppointmentStore((s) => s.items) as Appointment[];

  const getPatientById = usePatientStore((s) => s.fetchItemsById);
  const patients = usePatientStore((s) => s.items) as Patient[];

  const getStaffById = useStaffStore((s) => s.fetchItemsById);
  const staff = useStaffStore((s) => s.items) as Staff[];

  useEffect(() => {
    const fetchAllData = async () => {
      setLoadingAll(true);
      // 1️⃣ Fetch appointments first
      await getAppointments();

      // 2️⃣ Get the latest appointments
      const appointments = useAppointmentStore.getState().items;

      // 3️⃣ Extract unique patient and staff IDs
      const patientIds = [...new Set(appointments.map((a) => a.patientId))];
      const staffIds = [...new Set(appointments.map((a) => a.staffId))];

      // 4️⃣ Fetch all patients and staff in parallel
      await Promise.all([
        ...patientIds.map((id) => getPatientById(id)),
        ...staffIds.map((id) => getStaffById(id)),
      ]);

      setLoadingAll(false);
    };

    fetchAllData();
  }, [getAppointments, getPatientById, getStaffById]);

  const findPatient = (id: string) => patients.find((p) => p.id === id);
  const findStaff = (id: string) => staff.find((s) => s.id === id);

  const filteredAppointments = appointmentsList.filter((a) => {
    const patient = findPatient(a.patientId);
    const staffMember = findStaff(a.staffId);

    const patientName = patient ? `${patient.fName} ${patient.lName}` : "";
    const staffName = staffMember
      ? `${staffMember.fName} ${staffMember.lName}`
      : "";

    const matchesSearch =
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient?.studentId ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      a.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" || a.reason.toLowerCase().includes(filterType);

    return matchesSearch && matchesType;
  });

  const getTypeColor = (type?: string) => {
    const t = type?.toLowerCase() ?? "";
    if (t.includes("checkup")) return "bg-blue-100 text-blue-800";
    if (t.includes("follow-up")) return "bg-purple-100 text-purple-800";
    if (t.includes("consultation")) return "bg-orange-100 text-orange-800";
    if (t.includes("physical")) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  const appointmentTypes = [
    "all",
    "checkup",
    "follow-up",
    "consultation",
    "physical",
    "review",
  ];

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

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
              <Input
                type="text"
                placeholder="Search patients, staff, reasons..."
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {appointmentTypes.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
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

        {/* Appointment Cards */}
        <div className="space-y-6">
          {loadingAll ? (
            <p className="text-amber-700">Loading appointments...</p>
          ) : filteredAppointments.length === 0 ? (
            <Card className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-900 mb-2">
                No appointments found
              </h3>
              <p className="text-amber-700 mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <Link
                to="/appointmentAddingForm"
                className="w-full flex justify-center"
              >
                <button className="bg-amber-600 hover:bg-amber-700 text-white flex items-center space-x-2 my-20 text-center rounded-lg px-5 py-3">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Your First Appointment
                </button>
              </Link>
            </Card>
          ) : (
            filteredAppointments.map((a) => {
              const patient = findPatient(a.patientId);
              const staffMember = findStaff(a.staffId);

              const patientName = patient
                ? `${patient.fName} ${patient.lName}`
                : "Unknown Patient";
              const staffName = staffMember
                ? `${staffMember.fName} ${staffMember.lName}`
                : "Unknown Staff";

              return (
                <Card key={a.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3 mb-4">
                          <Avatar className="h-10 w-10 ring-2 ring-amber-200">
                            <AvatarFallback className="bg-amber-100 text-amber-600">
                              {patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-amber-900">
                                {patientName}
                              </h3>
                              <Badge
                                variant="secondary"
                                className={getTypeColor(a.reason)}
                              >
                                {a.reason || "General"}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-amber-700">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {a.date} {a.time}
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {staffName}
                              </div>
                              <div className="flex items-center">
                                <span className="mr-1">🆔</span>
                                {patient?.studentId || "N/A"}
                              </div>
                            </div>

                            {a.note && (
                              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <div className="flex items-start space-x-2">
                                  <MessageCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-medium text-amber-800 mb-1">
                                      Notes
                                    </p>
                                    <p className="text-sm text-amber-700">
                                      {a.note}
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
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-amber-600 border-amber-200 hover:bg-amber-50"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" /> Message
                          Patient
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentSchedule;
