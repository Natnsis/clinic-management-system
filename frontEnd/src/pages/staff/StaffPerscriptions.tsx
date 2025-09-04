import React, { useEffect, useState } from "react";
import { FileText, Search, Plus, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StaffSidebar from "@/components/staff/StaffSidebar";
import { Link } from "react-router-dom";
import { usePrescriptionStore, type Prescription } from "@/store/overallStore";

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getPrescriptions = usePrescriptionStore((state) => state.fetchItems);
  const prescriptions = usePrescriptionStore(
    (state) => state.items
  ) as Prescription[];

  useEffect(() => {
    getPrescriptions();
  }, [getPrescriptions]);

  // Filtering
  const filteredPrescriptions = prescriptions.filter((p) => {
    const medication = p.medication ?? "";
    const detail = p.detail ?? "";
    const patientId = p.patientId ?? "";
    const staffId = p.staffId ?? "";

    const matchesSearch =
      medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || (p.status ?? "active") === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalPrescriptions: prescriptions.length,
    refillsAvailable: prescriptions.reduce((sum, p) => {
      const refills =
        typeof p.refills === "string"
          ? parseInt(p.refills.replace(/\D/g, "")) || 0
          : p.refills ?? 0;
      return sum + refills;
    }, 0),
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: "Total Prescriptions",
              value: stats.totalPrescriptions,
              color: "amber-500",
            },
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
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            <Link to="/addPrescriptionForm">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Issue Prescription</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-50">
                <tr>
                  {[
                    "Medication",
                    "Detail",
                    "Duration",
                    "Frequency",
                    "Refills",
                    "Patient ID",
                    "Staff ID",
                    "Created At",
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
                {filteredPrescriptions.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-amber-50 transition-colors"
                  >
                    <td className="px-6 py-4">{p.medication}</td>
                    <td className="px-6 py-4">{p.detail}</td>
                    <td className="px-6 py-4">{p.duration}</td>
                    <td className="px-6 py-4">{p.frequency}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="secondary"
                        className={
                          (p.refills && p.refills !== "0") ||
                          (typeof p.refills === "number" && p.refills > 0)
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {p.refills}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">{p.patientId}</td>
                    <td className="px-6 py-4">{p.staffId}</td>
                    <td className="px-6 py-4">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-amber-600">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;
