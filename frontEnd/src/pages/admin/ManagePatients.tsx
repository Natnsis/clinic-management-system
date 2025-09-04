import { useEffect, useState } from "react";
import { Users, Search, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Sidebar from "@/components/admin/Sidebar";
import { usePatientStore } from "@/store/overallStore";

type Patient = {
  id: string;
  fName: string;
  lName: string;
  studentId: string;
  password: string;
  email: string;
  lastVisit: string;
  createdAt: string;
};

const ManagePatients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPatients = usePatientStore((state) => state.fetchItems);
  const patients = usePatientStore((state) => state.items) as Patient[];
  const isLoading = usePatientStore((state) => state.isLoading);
  const error = usePatientStore((state) => state.error);
  const deletePatient = usePatientStore((state) => state.deleteItem);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const filteredPatients = patients.filter(
    (p) =>
      p.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 p-8">
        {/* Header */}
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

        {/* Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, student ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-gray-200 focus:ring-2 focus:ring-emerald-500"
            />
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
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
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
                          <AvatarFallback className="bg-emerald-100 text-emerald-600">
                            {patient.fName[0]}
                            {patient.lName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.fName} {patient.lName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {patient.studentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {patient.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {patient.lastVisit}
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
                          className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => deletePatient(patient.id)}
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

          {filteredPatients.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-6">
                <Users className="h-10 w-10 text-emerald-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Patients Found
              </h3>

              <p className="text-gray-500 text-center max-w-sm">
                We couldn’t find any patients matching your search.
                <br /> Try adjusting your criteria or check again later.
              </p>

              <p className="mt-6 inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                <span>✨</span> No patients registered yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePatients;
