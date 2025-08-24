import React, { useState } from "react";
import {
  FileText,
  Search,
  Calendar as CalendarIcon,
  Download,
  Eye,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StaffSidebar from "@/components/staff/StaffSidebar";

const PatientRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock patient data
  const patients = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      patientId: "STU12345",
      email: "john.doe@university.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      year: "3rd Year",
      status: "active",
      avatar: "JD",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      patientId: "STU67890",
      email: "jane.smith@university.edu",
      phone: "+1 (555) 234-5678",
      department: "Engineering",
      year: "2nd Year",
      status: "active",
      avatar: "JS",
    },
    {
      id: 3,
      firstName: "Robert",
      lastName: "Johnson",
      patientId: "STU11223",
      email: "robert.johnson@university.edu",
      phone: "+1 (555) 345-6789",
      department: "Business",
      year: "4th Year",
      status: "inactive",
      avatar: "RJ",
    },
  ];

  // Mock medical records data
  const medicalRecords = [
    {
      id: 1,
      patientId: 1,
      type: "General Checkup",
      date: "June 15, 2023",
      doctor: "Dr. Sarah Johnson",
      diagnosis: "Routine health check, all vitals within normal range",
      treatment: "No treatment required. Maintain healthy lifestyle.",
      prescription: "None",
      status: "Reviewed",
      category: "checkup",
      attachments: 2,
    },
    {
      id: 2,
      patientId: 1,
      type: "Flu Symptoms",
      date: "May 10, 2023",
      doctor: "Dr. James Taylor",
      diagnosis: "Viral infection with mild flu symptoms",
      treatment: "Rest and hydration recommended",
      prescription:
        "Paracetamol 500mg, 1 tablet every 6 hours as needed for fever",
      status: "Reviewed",
      category: "illness",
      attachments: 1,
    },
    {
      id: 3,
      patientId: 2,
      type: "Physical Examination",
      date: "March 22, 2023",
      doctor: "Dr. Emily Rodriguez",
      diagnosis: "Fitness evaluation for sports participation",
      treatment: "Cleared for all sports activities",
      prescription: "Regular exercise routine recommended",
      status: "Reviewed",
      category: "checkup",
      attachments: 1,
    },
    {
      id: 4,
      patientId: 3,
      type: "Allergy Testing",
      date: "January 15, 2023",
      doctor: "Dr. Michael Chen",
      diagnosis: "Mild seasonal allergies (pollen)",
      treatment: "Avoidance of known allergens",
      prescription: "Loratadine 10mg, 1 tablet daily during allergy season",
      status: "Reviewed",
      category: "testing",
      attachments: 3,
    },
  ];

  const recordTypes = [
    "all",
    "checkup",
    "illness",
    "testing",
    "dental",
    "follow-up",
  ];
  const departments = [
    "all",
    "Computer Science",
    "Engineering",
    "Business",
    "Arts",
    "Science",
    "Medicine",
  ];

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || patient.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getPatientRecords = (patientId) => {
    return medicalRecords.filter((record) => record.patientId === patientId);
  };

  const getStatusColor = (status) => {
    return status === "Reviewed"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const getTypeColor = (type) => {
    const colors = {
      checkup: "bg-blue-100 text-blue-800",
      illness: "bg-red-100 text-red-800",
      testing: "bg-purple-100 text-purple-800",
      dental: "bg-green-100 text-green-800",
      "follow-up": "bg-yellow-100 text-yellow-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <StaffSidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-bold text-amber-900">
              Patient Records
            </h1>
          </div>
          <p className="text-amber-700">
            Access and manage patient medical records
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {patients.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Active Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {patients.filter((p) => p.status === "active").length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Total Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {medicalRecords.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {medicalRecords.filter((r) => r.status !== "Reviewed").length}
              </div>
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
                placeholder="Search patients by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Patients</CardTitle>
                <p className="text-sm text-amber-700">
                  Select a patient to view records
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() =>
                        setSelectedPatient(
                          selectedPatient?.id === patient.id ? null : patient
                        )
                      }
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedPatient?.id === patient.id
                          ? "bg-amber-100 border-2 border-amber-300"
                          : "hover:bg-amber-50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            alt={`${patient.firstName} ${patient.lastName}`}
                          />
                          <AvatarFallback className="bg-amber-100 text-amber-600">
                            {patient.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-amber-900 truncate">
                            {patient.firstName} {patient.lastName}
                          </p>
                          <p className="text-xs text-amber-700">
                            ID: {patient.patientId}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            patient.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient Records */}
          <div className="lg:col-span-3">
            {selectedPatient ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Medical Records for {selectedPatient.firstName}{" "}
                        {selectedPatient.lastName}
                      </CardTitle>
                      <p className="text-sm text-amber-700">
                        ID: {selectedPatient.patientId} •{" "}
                        {selectedPatient.department}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-amber-600 border-amber-200 hover:bg-amber-50"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {getPatientRecords(selectedPatient.id).length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-amber-900 mb-2">
                        No medical records found
                      </h3>
                      <p className="text-amber-700 mb-4">
                        This patient doesn't have any medical records yet.
                      </p>
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Add New Record
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {getPatientRecords(selectedPatient.id).map((record) => (
                        <div
                          key={record.id}
                          className="p-6 bg-amber-50 rounded-xl border border-amber-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0`}
                              >
                                <FileText className="h-5 w-5 text-amber-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-amber-900">
                                  {record.type}
                                </h3>
                                <p className="text-sm text-amber-700">
                                  by {record.doctor} • {record.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant="secondary"
                                className={getTypeColor(record.category)}
                              >
                                {record.category}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className={getStatusColor(record.status)}
                              >
                                {record.status}
                              </Badge>
                              {record.attachments > 0 && (
                                <Badge
                                  variant="secondary"
                                  className="bg-blue-100 text-blue-800"
                                >
                                  {record.attachments} attachment
                                  {record.attachments !== 1 ? "s" : ""}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="p-3 bg-white rounded-lg border border-amber-200">
                              <div className="text-sm font-medium text-amber-700 mb-1">
                                Diagnosis
                              </div>
                              <p className="text-amber-900">
                                {record.diagnosis}
                              </p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-amber-200">
                              <div className="text-sm font-medium text-amber-700 mb-1">
                                Treatment
                              </div>
                              <p className="text-amber-900">
                                {record.treatment}
                              </p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-amber-200">
                              <div className="text-sm font-medium text-amber-700 mb-1">
                                Prescription
                              </div>
                              <p className="text-amber-900">
                                {record.prescription}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-amber-600 border-amber-200 hover:bg-amber-100"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-amber-600 border-amber-200 hover:bg-amber-100"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-96 text-center">
                <CardContent>
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-amber-900 mb-2">
                    No patient selected
                  </h3>
                  <p className="text-amber-700 mb-4">
                    Please select a patient from the list to view their medical
                    records.
                  </p>
                  <p className="text-sm text-amber-600">
                    You can search for patients using the search bar above.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
