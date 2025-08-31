import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStaffStore } from "@/store/overallStore";

const EditStaffForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const staff = useStaffStore((state) => state.items);
  const updateStaff = useStaffStore((state) => state.updateItem);
  const isLoading = useStaffStore((state) => state.isLoading);
  const error = useStaffStore((state) => state.error);

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phoneNumber: "",
    role: "",
    department: "",
    status: "active",
    availability: "full_time",
  });

  useEffect(() => {
    const member = staff.find((s) => s.id.toString() === id);
    if (member) {
      setFormData({
        fName: member.fName,
        lName: member.lName,
        email: member.email,
        phoneNumber: member.phoneNumber,
        role: member.role,
        department: member.department,
        status: member.status,
        availability: member.availability,
      });
    }
  }, [id, staff]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateStaff(id!, formData);
      navigate("/manageStaff");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Go Back Link */}
        <div className="mb-6">
          <Link
            to="/manageStaff"
            className="text-emerald-600 hover:text-emerald-800 font-medium"
          >
            &larr; Go Back
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Edit Staff Member
          </h2>

          {isLoading ? (
            <p className="text-gray-500 animate-pulse">Loading staff...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  name="fName"
                  value={formData.fName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border-gray-200 focus:ring-emerald-500 flex-1"
                  required
                />
                <Input
                  name="lName"
                  value={formData.lName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border-gray-200 focus:ring-emerald-500 flex-1"
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border-gray-200 focus:ring-emerald-500 flex-1"
                  required
                />
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border-gray-200 focus:ring-emerald-500 flex-1"
                  required
                />
              </div>

              {/* Role & Department */}
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 flex-1"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="physician">Physician</option>
                  <option value="nurse">Nurse</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="technician">Technician</option>
                  <option value="specialist">Specialist</option>
                </select>

                <Input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Department"
                  className="border-gray-200 focus:ring-emerald-500 flex-1"
                  required
                />
              </div>

              {/* Status & Availability */}
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 flex-1"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 flex-1"
                  required
                >
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Part Time</option>
                </select>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Update Staff
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditStaffForm;
