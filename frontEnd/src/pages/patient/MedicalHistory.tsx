import React, { useState } from "react";
import {
  FileText,
  Search,
  Download,
  Calendar as CalendarIcon,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/patient/Header";

const MedicalHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterYear, setFilterYear] = useState("all");

  // Mock medical records data
  const medicalRecords = [
    {
      id: 1,
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
    {
      id: 5,
      type: "Dental Checkup",
      date: "November 8, 2022",
      doctor: "Dr. David Wilson",
      diagnosis: "Good oral health, minor plaque buildup",
      treatment: "Professional cleaning performed",
      prescription: "None",
      status: "Reviewed",
      category: "dental",
      attachments: 1,
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
  const years = ["all", "2023", "2022"];

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || record.category === filterType;
    const matchesYear =
      filterYear === "all" || record.date.includes(filterYear);

    return matchesSearch && matchesType && matchesYear;
  });

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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-16">
        {" "}
        {/* Offset for fixed header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Medical History
              </h1>
            </div>
            <p className="text-gray-600">
              View your complete medical records and visit history
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {medicalRecords.length}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  This Year
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {medicalRecords.filter((r) => r.date.includes("2023")).length}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Checkups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {
                    medicalRecords.filter((r) => r.category === "checkup")
                      .length
                  }
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-orange-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {
                    medicalRecords.filter(
                      (r) =>
                        r.prescription !== "None" &&
                        !r.prescription.includes("discontinued")
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
                  placeholder="Search records by type, doctor, or diagnosis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                {recordTypes
                  .filter((t) => t !== "all")
                  .map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
              </select>

              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Years</option>
                {years
                  .filter((y) => y !== "all")
                  .map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </select>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export All</span>
              </Button>
            </div>
          </div>

          {/* Records List */}
          <div className="space-y-6">
            {filteredRecords.length === 0 ? (
              <Card className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No medical records found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </Card>
            ) : (
              filteredRecords.map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3 mb-4">
                          <div
                            className={`h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0`}
                          >
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {record.type}
                              </h3>
                              <Badge
                                variant="secondary"
                                className={getTypeColor(record.category)}
                              >
                                {record.category}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800"
                              >
                                {record.status}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {record.doctor}
                              </div>
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                {record.date}
                              </div>
                              {record.attachments > 0 && (
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
                                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    ></path>
                                  </svg>
                                  {record.attachments} attachment
                                  {record.attachments !== 1 ? "s" : ""}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                              Diagnosis
                            </h4>
                            <p className="text-gray-700">{record.diagnosis}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                              Treatment
                            </h4>
                            <p className="text-gray-700">{record.treatment}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                              Prescription
                            </h4>
                            <p className="text-gray-700">
                              {record.prescription}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-6 lg:mt-0 lg:ml-6">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200"
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

export default MedicalHistory;
