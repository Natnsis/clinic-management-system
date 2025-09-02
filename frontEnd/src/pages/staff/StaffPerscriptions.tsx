import React, { useEffect, useState } from "react";
import { FileText, Search, Plus, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StaffSidebar from "@/components/staff/StaffSidebar";
import { Link } from "react-router-dom";
import { usePrescriptionStore, type Prescription } from "@/store/overallStore";

const medicationTypes = [
  "all",
  "antibiotics",
  "pain relief",
  "allergy",
  "vitamins",
  "chronic",
];

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("active");
  const [filterType, setFilterType] = useState("all");

  const getPrescriptions = usePrescriptionStore((state) => state.fetchItems);
  const prescriptions = usePrescriptionStore(
    (state) => state.items
  ) as Prescription[];
  console.log(prescriptions);
  useEffect(() => {
    getPrescriptions();
  }, [getPrescriptions]);

  // Filtered prescriptions
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const patient = prescription.patient ?? "";
    const medication = prescription.medication ?? "";
    const reason = prescription.reason ?? "";
    const patientId = prescription.patientId ?? "";

    const matchesSearch =
      patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || prescription.status === filterStatus;

    const matchesType =
      filterType === "all" ||
      (reason.toLowerCase().includes("allergy") && filterType === "allergy") ||
      ((reason.toLowerCase().includes("fever") ||
        reason.toLowerCase().includes("pain")) &&
        filterType === "pain relief") ||
      (reason.toLowerCase().includes("supplement") &&
        filterType === "vitamins");

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  const getTypeColor = (prescription: Prescription) => {
    const reason = (prescription.reason ?? "").toLowerCase();
    const medication = (prescription.medication ?? "").toLowerCase();

    if (reason.includes("allergy")) return "bg-orange-100 text-orange-800";
    if (reason.includes("fever") || reason.includes("pain"))
      return "bg-red-100 text-red-800";
    if (reason.includes("supplement") || medication.includes("vitamin"))
      return "bg-green-100 text-green-800";
    if (reason.includes("chronic")) return "bg-purple-100 text-purple-800";
    return "bg-blue-100 text-blue-800";
  };

  const stats = {
    totalPrescriptions: prescriptions.length,
    active: prescriptions.filter((p) => p.status === "active").length,
    completed: prescriptions.filter((p) => p.status === "completed").length,
    refillsAvailable: prescriptions
      .filter((p) => p.status === "active" && p.refills > 0)
      .reduce((sum, p) => sum + p.refills, 0),
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <StaffSidebar />
      <div className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-bold text-amber-900">Prescriptions</h1>
          </div>
          <p className="text-amber-700">
            Manage patient prescriptions and medication orders
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Prescriptions",
              value: stats.totalPrescriptions,
              color: "amber-500",
            },
            { label: "Active", value: stats.active, color: "green-500" },
            { label: "Completed", value: stats.completed, color: "blue-500" },
            {
              label: "Refills Available",
              value: stats.refillsAvailable,
              color: "orange-500",
            },
          ].map((stat) => (
            <Card
              key={stat.label}
              className={`border-l-4 border-${stat.color}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-amber-600">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
              <Input
                type="text"
                placeholder="Search patients, medications, or reasons..."
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
              <option value="completed">Completed</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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

            <Link to="/addPrescriptionForm">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Issue Prescription</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Prescriptions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-50">
                <tr>
                  {[
                    "Patient",
                    "Medication",
                    "Details",
                    "Duration",
                    "Refills",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-amber-100">
                {filteredPrescriptions.map((prescription) => (
                  <tr
                    key={prescription.id}
                    className="hover:bg-amber-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage alt={prescription.patient} />
                          <AvatarFallback className="bg-amber-100 text-amber-600">
                            {prescription.patient[0] +
                              prescription.patient.split(" ")[1][0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-amber-900">
                            {prescription.patient}
                          </div>
                          <div className="text-sm text-amber-700">
                            ID: {prescription.patientId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-amber-900">
                        {prescription.medication}
                      </div>
                      <Badge
                        variant="secondary"
                        className={getTypeColor(prescription)}
                      >
                        {prescription.reason}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-amber-800">
                        {prescription.dosage} • {prescription.frequency}
                        <div className="text-xs text-amber-600 mt-1">
                          Issued by: {prescription.doctor}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-amber-800">
                        {prescription.startDate} to {prescription.endDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          prescription.refills > 0
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {prescription.refills}{" "}
                        {prescription.refills === 1 ? "refill" : "refills"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(prescription.status)}
                      >
                        {prescription.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination placeholder */}
          <div className="px-6 py-4 bg-amber-50 flex items-center justify-between">
            <p className="text-sm text-amber-800">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">
                {Math.min(10, filteredPrescriptions.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {filteredPrescriptions.length}
              </span>{" "}
              results
            </p>
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                className="text-sm text-amber-700 border-amber-200"
                disabled
              >
                Previous
              </Button>
              <Button size="sm" className="bg-amber-600 text-white text-sm">
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-sm text-amber-700 border-amber-200"
                disabled={filteredPrescriptions.length <= 10}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-amber-900 mb-2">
              No prescriptions found
            </h3>
            <p className="text-amber-700">
              Try adjusting your search or filter criteria.
            </p>
            <Link to="/addPrescriptionForm">
              <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Issue New Prescription
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;
