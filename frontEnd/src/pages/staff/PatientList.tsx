import React, { useState } from "react";
import { Users, Search, User, Phone, Mail, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StaffSidebar from "@/components/staff/StaffSidebar";

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");

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
      lastVisit: "2023-06-15",
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
      lastVisit: "2023-06-14",
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
      lastVisit: "2023-05-20",
      avatar: "RJ",
    },
    {
      id: 4,
      firstName: "Lisa",
      lastName: "Anderson",
      patientId: "STU44556",
      email: "lisa.anderson@university.edu",
      phone: "+1 (555) 456-7890",
      department: "Arts",
      year: "1st Year",
      status: "active",
      lastVisit: "2023-06-12",
      avatar: "LA",
    },
    {
      id: 5,
      firstName: "Michael",
      lastName: "Chen",
      patientId: "STU77889",
      email: "michael.chen@university.edu",
      phone: "+1 (555) 567-8901",
      department: "Science",
      year: "3rd Year",
      status: "active",
      lastVisit: "2023-06-10",
      avatar: "MC",
    },
    {
      id: 6,
      firstName: "Emily",
      lastName: "Rodriguez",
      patientId: "STU99001",
      email: "emily.rodriguez@university.edu",
      phone: "+1 (555) 678-9012",
      department: "Medicine",
      year: "4th Year",
      status: "active",
      lastVisit: "2023-06-08",
      avatar: "ER",
    },
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
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || patient.status === filterStatus;
    const matchesDepartment =
      filterDepartment === "all" || patient.department === filterDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getDepartmentColor = (department) => {
    const colors = {
      "Computer Science": "bg-blue-100 text-blue-800",
      Engineering: "bg-purple-100 text-purple-800",
      Business: "bg-amber-100 text-amber-800",
      Arts: "bg-pink-100 text-pink-800",
      Science: "bg-green-100 text-green-800",
      Medicine: "bg-indigo-100 text-indigo-800",
    };
    return colors[department] || "bg-gray-100 text-gray-800";
  };

  const stats = {
    totalPatients: patients.length,
    activePatients: patients.filter((p) => p.status === "active").length,
    inactivePatients: patients.filter((p) => p.status === "inactive").length,
    departments: new Set(patients.map((p) => p.department)).size,
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <StaffSidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-bold text-amber-900">Patient List</h1>
          </div>
          <p className="text-amber-700">
            Manage and view student patient records
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
                {stats.totalPatients}
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
                {stats.activePatients}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Inactive Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.inactivePatients}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">
                Departments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.departments}
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
                placeholder="Search patients by name, ID, or email..."
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

            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments
                .filter((d) => d !== "all")
                .map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
            </select>

            <Button className="bg-amber-600 hover:bg-amber-700 text-white flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Add Patient</span>
            </Button>
          </div>
        </div>

        {/* Patient List */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-amber-100">
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-amber-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            alt={`${patient.firstName} ${patient.lastName}`}
                          />
                          <AvatarFallback className="bg-amber-100 text-amber-600">
                            {patient.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-amber-900">
                            {patient.firstName} {patient.lastName}
                          </div>
                          <div className="text-sm text-amber-700">
                            ID: {patient.patientId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-amber-800">
                          <Mail className="h-4 w-4 mr-1 text-amber-600" />
                          {patient.email}
                        </div>
                        <div className="flex items-center text-sm text-amber-800">
                          <Phone className="h-4 w-4 mr-1 text-amber-600" />
                          {patient.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className={getDepartmentColor(patient.department)}
                      >
                        {patient.department}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                        {patient.year}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-800">
                      {patient.lastVisit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(patient.status)}
                      >
                        {patient.status}
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

          <div className="px-6 py-4 bg-amber-50 flex items-center justify-between">
            <p className="text-sm text-amber-800">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">
                {Math.min(10, filteredPatients.length)}
              </span>{" "}
              of <span className="font-medium">{filteredPatients.length}</span>{" "}
              results
            </p>
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                className="text-sm text-amber-700 border-amber-200"
                disabled={true}
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
                disabled={filteredPatients.length <= 10}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-amber-900 mb-2">
              No patients found
            </h3>
            <p className="text-amber-700">
              Try adjusting your search or filter criteria.
            </p>
            <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white">
              Add New Patient
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
