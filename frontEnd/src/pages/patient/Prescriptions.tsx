import React, { useState } from "react";
import {
  FileText,
  Search,
  Download,
  AlertTriangle,
  Calendar as CalendarIcon,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/patient/Header";

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("active");
  const [filterType, setFilterType] = useState("all");

  // Mock prescription data
  const prescriptions = [
    {
      id: 1,
      medication: "Loratadine",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "November 1, 2023",
      endDate: "Ongoing",
      doctor: "Dr. Michael Chen",
      reason: "Seasonal allergies",
      status: "active",
      refills: 2,
      pharmacy: "Campus Pharmacy",
      instructions:
        "Take one tablet daily with water. May be taken with or without food.",
    },
    {
      id: 2,
      medication: "Paracetamol",
      dosage: "500mg",
      frequency: "As needed",
      startDate: "May 10, 2023",
      endDate: "June 10, 2023",
      doctor: "Dr. James Taylor",
      reason: "Fever and pain relief",
      status: "completed",
      refills: 0,
      pharmacy: "University Health Center",
      instructions:
        "Take one tablet every 6 hours as needed for fever or pain. Do not exceed 4 tablets in 24 hours.",
    },
    {
      id: 3,
      medication: "Multivitamin",
      dosage: "1 tablet",
      frequency: "Once daily",
      startDate: "January 15, 2023",
      endDate: "Ongoing",
      doctor: "Dr. Sarah Johnson",
      reason: "General health supplement",
      status: "active",
      refills: 4,
      pharmacy: "Campus Pharmacy",
      instructions: "Take one tablet daily with breakfast.",
    },
  ];

  const medicationTypes = [
    "all",
    "antibiotics",
    "pain relief",
    "allergy",
    "vitamins",
    "chronic",
  ];

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.medication
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || prescription.status === filterStatus;
    const matchesType =
      filterType === "all" ||
      (prescription.reason.toLowerCase().includes("allergy") &&
        filterType === "allergy") ||
      (prescription.reason.toLowerCase().includes("fever") &&
        filterType === "pain relief") ||
      (prescription.reason.toLowerCase().includes("supplement") &&
        filterType === "vitamins") ||
      (prescription.reason.toLowerCase().includes("chronic") &&
        filterType === "chronic");

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  const getTypeColor = (prescription) => {
    if (prescription.reason.toLowerCase().includes("allergy")) {
      return "bg-orange-100 text-orange-800";
    } else if (
      prescription.reason.toLowerCase().includes("fever") ||
      prescription.reason.toLowerCase().includes("pain")
    ) {
      return "bg-red-100 text-red-800";
    } else if (
      prescription.reason.toLowerCase().includes("supplement") ||
      prescription.medication.toLowerCase().includes("vitamin")
    ) {
      return "bg-green-100 text-green-800";
    } else if (prescription.reason.toLowerCase().includes("chronic")) {
      return "bg-purple-100 text-purple-800";
    } else {
      return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-16">
        {" "}
        {/* Offset for fixed header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Prescriptions
              </h1>
            </div>
            <p className="text-gray-600">
              Manage your current and past prescriptions
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {prescriptions.length}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {prescriptions.filter((p) => p.status === "active").length}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Refills Available
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {prescriptions
                    .filter((p) => p.status === "active" && p.refills > 0)
                    .reduce((sum, p) => sum + p.refills, 0)}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-orange-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Due for Refill
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {
                    prescriptions.filter(
                      (p) => p.status === "active" && p.refills > 0
                    ).length
                  }
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
                  placeholder="Search medications, reasons, or doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                {medicationTypes
                  .filter((t) => t !== "all")
                  .map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
              </select>

              <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>

          {/* Prescriptions List */}
          <div className="space-y-6">
            {filteredPrescriptions.length === 0 ? (
              <Card className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No prescriptions found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </Card>
            ) : (
              filteredPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3 mb-4">
                          <div
                            className={`h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0`}
                          >
                            <FileText className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {prescription.medication}
                              </h3>
                              <Badge
                                variant="secondary"
                                className={getTypeColor(prescription)}
                              >
                                {prescription.reason}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className={getStatusColor(prescription.status)}
                              >
                                {prescription.status}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {prescription.doctor}
                              </div>
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                {prescription.startDate} -{" "}
                                {prescription.endDate}
                              </div>
                              <div className="flex items-center">
                                <svg
                                  className="h-4 w-4 mr-1 text-blue-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                  ></path>
                                </svg>
                                {prescription.pharmacy}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-600">
                              Dosage
                            </div>
                            <div className="font-semibold text-gray-900">
                              {prescription.dosage}
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-600">
                              Frequency
                            </div>
                            <div className="font-semibold text-gray-900">
                              {prescription.frequency}
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-600">
                              Refills
                            </div>
                            <div className="font-semibold text-gray-900">
                              {prescription.refills}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            Instructions
                          </h4>
                          <p className="text-gray-700">
                            {prescription.instructions}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 mt-6 lg:mt-0 lg:ml-6">
                        {prescription.status === "active" &&
                          prescription.refills > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-200 text-green-700 hover:bg-green-50"
                            >
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Request Refill
                            </Button>
                          )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-purple-600 border-purple-200"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-600"
                        >
                          <Download className="h-4 w-4" />
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

export default Prescriptions;
