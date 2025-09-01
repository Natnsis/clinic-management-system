import React, { useEffect, useState } from "react";
import { FileText, ArrowLeft, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StaffSidebar from "@/components/staff/StaffSidebar";

import { usePatientStore, usePrescriptionStore } from "@/store/overallStore";
import type { Patient } from "@/store/overallStore";
import { useAuthStore } from "@/store/authStore";

enum Refills {
  no_refills = "no_refills",
  one_refill = "one_refill",
  two_refills = "two_refills",
  three_refills = "three_refills",
  four_refills = "four_refills",
}

const AddPrescriptionForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // store hooks
  const getPatients = usePatientStore((state) => state.fetchItems);
  const patients = usePatientStore((state) => state.items) as Patient[];
  const addPrescription = usePrescriptionStore((state) => state.addItem);
  const staff = useAuthStore((state) => state.user);
  const staffId = staff?.userId;

  // Form state
  const [formData, setFormData] = useState({
    medication: "",
    detail: "",
    duration: "",
    refills: Refills.no_refills,
    frequency: "",
  });

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  // Filter patients
  const filteredPatients = patients.filter(
    (patient) =>
      patient.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.studentId ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (patient.email ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle patient selection
  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient first.");
      return;
    }
    if (!staffId) {
      alert("Staff not found. Please log in again.");
      return;
    }

    const newPrescription = {
      ...formData,
      patientId: selectedPatient.id,
      staffId,
    };

    try {
      await addPrescription(newPrescription);
      alert("Prescription issued successfully!");
      setFormData({
        medication: "",
        detail: "",
        duration: "",
        refills: Refills.no_refills,
        frequency: "",
      });
      setSelectedPatient(null);
      setSearchTerm("");
    } catch (error) {
      console.error("Error issuing prescription:", error);
      alert("Failed to issue prescription. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <StaffSidebar />

      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="text-amber-700"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <FileText className="h-8 w-8 text-amber-600" />
          <h1 className="text-2xl font-bold text-amber-900">
            Add Prescription
          </h1>
        </div>

        <Card className="bg-white shadow-sm border border-amber-100 max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-amber-800">Select Patient</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
              <Input
                type="text"
                placeholder="Search patients by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-amber-200 focus:ring-amber-500"
              />
            </div>

            {/* Patients List */}
            <div className="border border-amber-200 rounded-lg max-h-60 overflow-y-auto">
              {filteredPatients.length === 0 ? (
                <p className="text-center py-6 text-amber-600">
                  No patients found
                </p>
              ) : (
                <ul className="divide-y divide-amber-100">
                  {filteredPatients.map((patient) => (
                    <li
                      key={patient.id}
                      onClick={() => handlePatientSelect(patient)}
                      className={`p-4 cursor-pointer hover:bg-amber-50 transition flex items-center space-x-3 ${
                        selectedPatient?.id === patient.id ? "bg-amber-100" : ""
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-amber-100 text-amber-600">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-amber-900">
                          {patient.fName} {patient.lName}
                        </p>
                        <p className="text-sm text-amber-600">
                          ID: {patient.studentId || patient.id} •{" "}
                          {patient.email || "No email"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Show selected patient */}
            {selectedPatient && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <span className="font-medium">Selected:</span>{" "}
                  {selectedPatient.fName} {selectedPatient.lName} (
                  {selectedPatient.studentId || selectedPatient.id})
                </p>
              </div>
            )}

            {/* Prescription Form */}
            {selectedPatient && (
              <>
                <hr className="border-amber-200 my-6" />
                <CardTitle className="text-amber-800 mb-4">
                  Prescription Details
                </CardTitle>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="medication" className="text-amber-800">
                      Medication
                    </Label>
                    <Input
                      id="medication"
                      name="medication"
                      value={formData.medication}
                      onChange={handleInputChange}
                      placeholder="e.g. Loratadine"
                      required
                      className="border-amber-200 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="detail" className="text-amber-800">
                      Detail / Instructions
                    </Label>
                    <Textarea
                      id="detail"
                      name="detail"
                      value={formData.detail}
                      onChange={handleInputChange}
                      placeholder="e.g. Take one tablet daily with water..."
                      rows={4}
                      required
                      className="border-amber-200 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-amber-800">
                        Duration
                      </Label>
                      <Input
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="e.g. 7 days"
                        required
                        className="border-amber-200 focus:ring-amber-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="refills" className="text-amber-800">
                        Refills
                      </Label>
                      <select
                        id="refills"
                        name="refills"
                        value={formData.refills}
                        onChange={handleInputChange}
                        required
                        className="border border-amber-200 rounded px-2 py-1 focus:ring-amber-500"
                      >
                        {Object.values(Refills).map((refill) => (
                          <option key={refill} value={refill}>
                            {refill.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="frequency" className="text-amber-800">
                        Frequency
                      </Label>
                      <Input
                        id="frequency"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        placeholder="e.g. Twice daily"
                        required
                        className="border-amber-200 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end pt-6 space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="text-amber-700 border-amber-200"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Issue Prescription
                    </Button>
                  </div>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddPrescriptionForm;
