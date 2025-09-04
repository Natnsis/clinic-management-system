import  { useEffect, useState } from "react";
import {
  FileText,
  Search,
  Download,
  AlertTriangle,
  Calendar as CalendarIcon,
  User,
  Trash2,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/patient/Header";
import { usePrescriptionStore, type Prescription } from "@/store/overallStore";

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const getPrescriptions = usePrescriptionStore((state) => state.fetchItems);
  const deletePrescription = usePrescriptionStore((state) => state.deleteItem);
  const updatePrescription = usePrescriptionStore((state) => state.updateItem);
  const prescriptions = usePrescriptionStore((state) => state.items) as Prescription[];

  useEffect(() => {
    getPrescriptions();
  }, [getPrescriptions]);


  const getStatusColor = (status: string) =>
    status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";

  const getTypeColor = (prescription: Prescription) => {
    const reason = prescription.detail.toLowerCase();
    if (reason.includes("allergy")) return "bg-orange-100 text-orange-800";
    if (reason.includes("fever") || reason.includes("pain")) return "bg-red-100 text-red-800";
    if (reason.includes("supplement") || prescription.medication.toLowerCase().includes("vitamin"))
      return "bg-green-100 text-green-800";
    if (reason.includes("chronic")) return "bg-purple-100 text-purple-800";
    return "bg-blue-100 text-blue-800";
  };

  const filteredPrescriptions = prescriptions.filter((p) => {
    const matchesSearch =
      p.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.staffId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || p.detail.toLowerCase().includes(filterType);

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          </div>
          <p className="text-gray-600">Manage your current and past prescriptions</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search medications, reasons, or staff..."
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </Card>
          ) : (
            filteredPrescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between">
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
                            <Badge variant="secondary" className={getTypeColor(prescription)}>
                              {prescription.detail}
                            </Badge>
                                                    </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {prescription.staffId}
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {prescription.createdAt}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-600">Dosage</div>
                          <div className="font-semibold text-gray-900">{prescription.duration}</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-600">Frequency</div>
                          <div className="font-semibold text-gray-900">{prescription.frequency}</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-600">Refills</div>
                          <div className="font-semibold text-gray-900">{prescription.refills}</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-600">Patient ID</div>
                          <div className="font-semibold text-gray-900">{prescription.patientId}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Instructions</h4>
                        <p className="text-gray-700">{prescription.detail}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 mt-6 lg:mt-0 lg:ml-6">
                      {prescription.status === "active" && prescription.refills > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-200 text-green-700 hover:bg-green-50"
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" /> Request Refill
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-purple-600 border-purple-200"
                        onClick={() => updatePrescription(prescription.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" /> Update
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200"
                        onClick={() => deletePrescription(prescription.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
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
  );
};

export default Prescriptions;
