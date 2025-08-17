import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar as CalendarIcon,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/admin/Sidebar";

const ManagePatients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");

  // Mock patient data
  const patients = [
    {
      id: 1,
      firstName: "Sarah",
      lastName: "Johnson",
      patientId: "STU12345",
      email: "sarah.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      department: "Medicine",
      year: "3rd Year",
      status: "active",
      lastVisit: "2023-06-15",
      avatar: "SJ",
    },
    {
      id: 2,
      firstName: "Michael",
      lastName: "Chen",
      patientId: "STU67890",
      email: "michael.chen@university.edu",
      phone: "+1 (555) 234-5678",
      department: "Engineering",
      year: "2nd Year",
      status: "active",
      lastVisit: "2023-06-14",
      avatar: "MC",
    },
    {
      id: 3,
      firstName: "Emily",
      lastName: "Rodriguez",
      patientId: "STU11223",
      email: "emily.rodriguez@university.edu",
      phone: "+1 (555) 345-6789",
      department: "Business",
      year: "4th Year",
      status: "inactive",
      lastVisit: "2023-05-20",
      avatar: "ER",
    },
    {
      id: 4,
      firstName: "David",
      lastName: "Wilson",
      patientId: "STU44556",
      email: "david.wilson@university.edu",
      phone: "+1 (555) 456-7890",
      department: "Arts",
      year: "1st Year",
      status: "active",
      lastVisit: "2023-06-12",
      avatar: "DW",
    },
    {
      id: 5,
      firstName: "Lisa",
      lastName: "Anderson",
      patientId: "STU77889",
      email: "lisa.anderson@university.edu",
      phone: "+1 (555) 567-8901",
      department: "Science",
      year: "3rd Year",
      status: "active",
      lastVisit: "2023-06-10",
      avatar: "LA",
    },
    {
      id: 6,
      firstName: "James",
      lastName: "Taylor",
      patientId: "STU99001",
      email: "james.taylor@university.edu",
      phone: "+1 (555) 678-9012",
      department: "Law",
      year: "4th Year",
      status: "active",
      lastVisit: "2023-06-08",
      avatar: "JT",
    },
    {
      id: 7,
      firstName: "Jennifer",
      lastName: "Lee",
      patientId: "STU22334",
      email: "jennifer.lee@university.edu",
      phone: "+1 (555) 789-0123",
      department: "Medicine",
      year: "2nd Year",
      status: "inactive",
      lastVisit: "2023-04-15",
      avatar: "JL",
    },
    {
      id: 8,
      firstName: "Robert",
      lastName: "Kim",
      patientId: "STU55667",
      email: "robert.kim@university.edu",
      phone: "+1 (555) 890-1234",
      department: "Engineering",
      year: "1st Year",
      status: "active",
      lastVisit: "2023-06-05",
      avatar: "RK",
    },
  ];

  const departments = [
    "all",
    "Medicine",
    "Engineering",
    "Business",
    "Arts",
    "Science",
    "Law",
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
      Medicine: "bg-blue-100 text-blue-800",
      Engineering: "bg-purple-100 text-purple-800",
      Business: "bg-amber-100 text-amber-800",
      Arts: "bg-pink-100 text-pink-800",
      Science: "bg-green-100 text-green-800",
      Law: "bg-indigo-100 text-indigo-800",
    };
    return colors[department] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Patient Management
            </h1>
          </div>
          <p className="text-gray-600">
            Manage student patient records and appointments
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Patients
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Patients
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter((p) => p.status === "active").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Inactive Patients
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter((p) => p.status === "inactive").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Recent Visits
                </p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search patients by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-200 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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

            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Patient</span>
            </Button>
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            alt={`${patient.firstName} ${patient.lastName}`}
                          />
                          <AvatarFallback className="bg-emerald-100 text-emerald-600">
                            {patient.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.firstName} {patient.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {patient.patientId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-1 text-gray-400" />
                          {patient.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-1 text-gray-400" />
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
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {patient.year}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
            <p className="text-sm text-gray-700">
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
                className="text-sm"
                disabled={true}
              >
                Previous
              </Button>
              <Button size="sm" className="bg-emerald-600 text-white text-sm">
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-sm"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No patients found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
              Add New Patient
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePatients;
