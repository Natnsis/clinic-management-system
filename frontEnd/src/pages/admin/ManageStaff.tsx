import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  XCircle,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/admin/Sidebar";

const ManageStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");

  // Mock staff data
  const staff = [
    {
      id: 1,
      firstName: "Dr. Sarah",
      lastName: "Johnson",
      role: "Physician",
      email: "sarah.johnson@clinic.edu",
      phone: "+1 (555) 123-4567",
      department: "General Medicine",
      status: "active",
      hireDate: "2020-03-15",
      avatar: "SJ",
      availability: "Full-time",
    },
    {
      id: 2,
      firstName: "Michael",
      lastName: "Chen",
      role: "Nurse",
      email: "michael.chen@clinic.edu",
      phone: "+1 (555) 234-5678",
      department: "Emergency",
      status: "active",
      hireDate: "2021-06-20",
      avatar: "MC",
      availability: "Full-time",
    },
    {
      id: 3,
      firstName: "Emily",
      lastName: "Rodriguez",
      role: "Receptionist",
      email: "emily.rodriguez@clinic.edu",
      phone: "+1 (555) 345-6789",
      department: "Administration",
      status: "active",
      hireDate: "2019-09-10",
      avatar: "ER",
      availability: "Full-time",
    },
    {
      id: 4,
      firstName: "David",
      lastName: "Wilson",
      role: "Technician",
      email: "david.wilson@clinic.edu",
      phone: "+1 (555) 456-7890",
      department: "Laboratory",
      status: "inactive",
      hireDate: "2018-11-05",
      avatar: "DW",
      availability: "Part-time",
    },
    {
      id: 5,
      firstName: "Dr. Lisa",
      lastName: "Anderson",
      role: "Specialist",
      email: "lisa.anderson@clinic.edu",
      phone: "+1 (555) 567-8901",
      department: "Cardiology",
      status: "active",
      hireDate: "2022-01-15",
      avatar: "LA",
      availability: "Full-time",
    },
    {
      id: 6,
      firstName: "James",
      lastName: "Taylor",
      role: "Physician",
      email: "james.taylor@clinic.edu",
      phone: "+1 (555) 678-9012",
      department: "Pediatrics",
      status: "active",
      hireDate: "2020-08-22",
      avatar: "JT",
      availability: "Full-time",
    },
    {
      id: 7,
      firstName: "Jennifer",
      lastName: "Lee",
      role: "Nurse",
      email: "jennifer.lee@clinic.edu",
      phone: "+1 (555) 789-0123",
      department: "Surgery",
      status: "active",
      hireDate: "2021-03-30",
      avatar: "JL",
      availability: "Full-time",
    },
    {
      id: 8,
      firstName: "Robert",
      lastName: "Kim",
      role: "Technician",
      email: "robert.kim@clinic.edu",
      phone: "+1 (555) 890-1234",
      department: "Radiology",
      status: "active",
      hireDate: "2022-05-18",
      avatar: "RK",
      availability: "Part-time",
    },
  ];

  const roles = [
    "all",
    "Physician",
    "Nurse",
    "Receptionist",
    "Technician",
    "Specialist",
  ];
  const departments = [
    "all",
    "General Medicine",
    "Emergency",
    "Administration",
    "Laboratory",
    "Cardiology",
    "Pediatrics",
    "Surgery",
    "Radiology",
  ];

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || member.status === filterStatus;
    const matchesRole = filterRole === "all" || member.role === filterRole;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getRoleColor = (role) => {
    const colors = {
      Physician: "bg-blue-100 text-blue-800",
      Nurse: "bg-green-100 text-green-800",
      Receptionist: "bg-amber-100 text-amber-800",
      Technician: "bg-purple-100 text-purple-800",
      Specialist: "bg-indigo-100 text-indigo-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const getAvailabilityColor = (availability) => {
    return availability === "Full-time"
      ? "bg-emerald-100 text-emerald-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Staff Management
            </h1>
          </div>
          <p className="text-gray-600">
            Manage clinic staff members and their information
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
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staff.length}
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
                  Active Staff
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {staff.filter((s) => s.status === "active").length}
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
                  Inactive Staff
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {staff.filter((s) => s.status === "inactive").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">9</p>
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
                placeholder="Search staff by name, role, or department..."
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
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              {roles
                .filter((r) => r !== "all")
                .map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
            </select>

            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Staff</span>
            </Button>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role & Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hire Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
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
                {filteredStaff.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            alt={`${member.firstName} ${member.lastName}`}
                          />
                          <AvatarFallback className="bg-emerald-100 text-emerald-600">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.firstName} {member.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            Staff ID: STF{member.id.toString().padStart(4, "0")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <Badge
                          variant="secondary"
                          className={getRoleColor(member.role)}
                        >
                          {member.role}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Building className="h-4 w-4 mr-1 text-gray-400" />
                          {member.department}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-1 text-gray-400" />
                          {member.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-1 text-gray-400" />
                          {member.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {member.hireDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className={getAvailabilityColor(member.availability)}
                      >
                        {member.availability}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(member.status)}
                      >
                        {member.status}
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
                {Math.min(10, filteredStaff.length)}
              </span>{" "}
              of <span className="font-medium">{filteredStaff.length}</span>{" "}
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
                disabled={filteredStaff.length <= 10}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No staff members found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
              Add New Staff
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStaff;
