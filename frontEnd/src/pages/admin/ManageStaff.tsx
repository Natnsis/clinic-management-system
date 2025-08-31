import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
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
import { Link } from "react-router-dom";
import { useStaffStore } from "@/store/overallStore";

const ManageStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");

  const staff = useStaffStore((state) => state.items);
  const isLoading = useStaffStore((state) => state.isLoading);
  const error = useStaffStore((state) => state.error);
  const fetchStaff = useStaffStore((state) => state.fetchItems);
  const deleteStaff = useStaffStore((state) => state.deleteItem);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const onclickDelete = async (id: number) => {
    await deleteStaff(id);
  };

  // Filter safely
  const filteredStaff = staff.filter((member) => {
    const fName = member.fName || "";
    const lName = member.lName || "";
    const role = member.role || "";
    const email = member.email || "";
    const department = member.department || "";

    const matchesSearch =
      fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || member.status === filterStatus;
    const matchesRole = filterRole === "all" || role === filterRole;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) =>
    status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      physician: "bg-blue-100 text-blue-800",
      nurse: "bg-green-100 text-green-800",
      receptionist: "bg-amber-100 text-amber-800",
      technician: "bg-purple-100 text-purple-800",
      specialist: "bg-indigo-100 text-indigo-800",
    };
    return colors[role.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const getAvailabilityColor = (availability: string) =>
    availability === "full_time"
      ? "bg-emerald-100 text-emerald-800"
      : "bg-yellow-100 text-yellow-800";

  const getInitials = (fName: string, lName: string) =>
    `${fName?.[0] || ""}${lName?.[0] || ""}`.toUpperCase();

  const formatDate = (dateString?: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 p-8">
        {/* Header */}
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

        {/* Stats */}
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
                <p className="text-2xl font-bold text-gray-900">
                  {[...new Set(staff.map((s) => s.department || ""))].length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 flex flex-col lg:flex-row gap-4">
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
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Roles</option>
            {[...new Set(staff.map((m) => m.role || ""))].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <Link to="/addStaff">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Staff</span>
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          {isLoading || error || filteredStaff.length === 0 ? (
            <div className="min-h-[200px] flex items-center justify-center p-6">
              {isLoading ? (
                <p className="text-gray-500 animate-pulse text-lg font-medium">
                  Loading staff data...
                </p>
              ) : error ? (
                <p className="text-red-500 text-lg font-medium">{error}</p>
              ) : (
                <div className="text-center">
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
          ) : (
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
                            alt={`${member.fName || ""} ${member.lName || ""}`}
                          />
                          <AvatarFallback className="bg-emerald-100 text-emerald-600">
                            {getInitials(
                              member.fName || "",
                              member.lName || ""
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.fName || ""} {member.lName || ""}
                          </div>
                          <div className="text-sm text-gray-500">
                            Staff ID: STF
                            {member.id?.toString().padStart(4, "0")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <Badge
                          variant="secondary"
                          className={getRoleColor(member.role || "")}
                        >
                          {member.role || "N/A"}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Building className="h-4 w-4 mr-1 text-gray-400" />{" "}
                          {member.department || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-1 text-gray-400" />{" "}
                          {member.email || "N/A"}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-1 text-gray-400" />{" "}
                          {member.phoneNumber || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(member.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className={getAvailabilityColor(
                          member.availability || ""
                        )}
                      >
                        {member.availability || "N/A"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(member.status || "")}
                      >
                        {member.status || "N/A"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                      <Link to={`/editStaffForm/${member.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => onclickDelete(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;
