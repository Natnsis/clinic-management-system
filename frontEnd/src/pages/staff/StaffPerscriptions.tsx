import { useEffect, useState } from "react";
import { FileText, Search, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StaffSidebar from "@/components/staff/StaffSidebar";
import { Link } from "react-router-dom";
import { usePrescriptionStore, type Prescription } from "@/store/overallStore";

// Medication type filters
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
  const [filterType, setFilterType] = useState("all");

  const getPrescriptions = usePrescriptionStore((state) => state.fetchItems);
  const deletePrescription = usePrescriptionStore((state) => state.deleteItem);
  const prescriptions = usePrescriptionStore(
    (state) => state.items
  ) as Prescription[];

  useEffect(() => {
    getPrescriptions();
  }, [getPrescriptions]);

  // Filtered prescriptions — search + type only
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const patient = prescription.patient?.name || prescription.patient || "";
    const medication = prescription.medication || "";
    const reason = prescription.reason || "";
    const patientId = prescription.patientId || "";

    const matchesSearch =
      patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" ||
      {
        allergy: reason.toLowerCase().includes("allergy"),
        "pain relief": ["pain", "fever", "headache", "ache"].some((word) =>
          reason.toLowerCase().includes(word)
        ),
        vitamins: ["vitamin", "supplement", "multivitamin"].some(
          (word) =>
            medication.toLowerCase().includes(word) ||
            reason.toLowerCase().includes(word)
        ),
        antibiotics: [
          "antibiotic",
          "amoxicillin",
          "azithromycin",
          "infection",
        ].some((word) => medication.toLowerCase().includes(word)),
        chronic: [
          "chronic",
          "diabetes",
          "hypertension",
          "asthma",
          "arthritis",
        ].some((word) => reason.toLowerCase().includes(word)),
      }[filterType];

    return matchesSearch && matchesType;
  });

  // Badge color by type
  const getTypeColor = (prescription: Prescription) => {
    const reason = (prescription.reason || "").toLowerCase();
    const medication = (prescription.medication || "").toLowerCase();

    if (reason.includes("allergy")) return "bg-orange-100 text-orange-800";
    if (
      reason.includes("pain") ||
      reason.includes("fever") ||
      reason.includes("headache")
    )
      return "bg-red-100 text-red-800";
    if (medication.includes("vitamin") || reason.includes("supplement"))
      return "bg-green-100 text-green-800";
    if (
      ["chronic", "diabetes", "hypertension", "asthma"].some((r) =>
        reason.includes(r)
      )
    )
      return "bg-purple-100 text-purple-800";
    if (medication.includes("antibiotic")) return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
  };

  // Stats
  const stats = {
    totalPrescriptions: prescriptions.length,
    refillsAvailable: prescriptions.reduce(
      (sum, p) => sum + (p.refills > 0 ? p.refills : 0),
      0
    ),
  };

  // Handle delete with confirmation
  const handleDelete = (id: string, patientName: string) => {
    const confirmed = window.confirm(
      `⚠️ Delete prescription for ${patientName}? This cannot be undone.`
    );

    if (confirmed) {
      try {
        deletePrescription(id);
        console.log("Prescription deleted:", id);
      } catch (err) {
        console.error("Failed to delete prescription:", err);
        alert("Could not delete prescription. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <StaffSidebar />
      <div className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-amber-600" />
              <div>
                <h1 className="text-2xl font-bold text-amber-900">
                  Prescriptions
                </h1>
                <p className="text-amber-700">Manage patient prescriptions</p>
              </div>
            </div>

            {/* Add New Prescription Button */}
            <Link to="/addPrescriptionForm">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6">
                <Plus className="h-4 w-4 mr-2" />
                Issue Prescription
              </Button>
            </Link>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: "Total Prescriptions",
              value: stats.totalPrescriptions,
              color: "amber-500",
            },
            {
              label: "With Refills",
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                {filteredPrescriptions.map((prescription) => {
                  const patientName = prescription.patient || "Unknown Patient";
                  return (
                    <tr
                      key={prescription.id}
                      className="hover:bg-amber-50 transition-colors"
                    >
                      {/* Patient */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage alt={patientName} />
                            <AvatarFallback className="bg-amber-100 text-amber-600">
                              {patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-amber-900">
                              {patientName}
                            </div>
                            <div className="text-sm text-amber-700">
                              ID: {prescription.patientId}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Medication */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-amber-900">
                          {prescription.medication}
                        </div>
                        <Badge
                          variant="secondary"
                          className={getTypeColor(prescription)}
                        >
                          {prescription.reason || "General"}
                        </Badge>
                      </td>

                      {/* Details */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-amber-800">
                          {prescription.dosage} • {prescription.frequency}
                          <div className="text-xs text-amber-600 mt-1">
                            Issued by: {prescription.doctor || "Unknown"}
                          </div>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-amber-800">
                          {prescription.startDate} → {prescription.endDate}
                        </div>
                      </td>

                      {/* Refills */}
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

                      {/* Actions - Only Delete */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                          onClick={() =>
                            handleDelete(prescription.id, patientName)
                          }
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination (Placeholder) */}
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

        {/* Empty State */}
        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-amber-900 mb-2">
              No prescriptions found
            </h3>
            <p className="text-amber-700 mb-4">
              Try adjusting your search or create a new one.
            </p>
            <Link to="/addPrescriptionForm">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
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
