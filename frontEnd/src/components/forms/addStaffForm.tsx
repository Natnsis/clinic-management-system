import { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Shield,
  Building,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/admin/Sidebar";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addStaffFromSchema } from "@/schemas/userFormSchema";
import { useStaffStore } from "@/store/overallStore";

type staffFormValues = z.infer<typeof addStaffFromSchema>;

const AddStaffForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const registerStaff = useStaffStore((state) => state.addItem);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<staffFormValues>({
    resolver: zodResolver(addStaffFromSchema),
  });

  const onSubmit = async (data: staffFormValues) => {
    setIsSubmitting(true);
    await registerStaff(data);
    setTimeout(() => {
      setShowSuccess(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 p-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/ManageStaff">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Staff Management</span>
            </Button>
          </Link>
        </div>

        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <User className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Staff Member
            </h1>
          </div>
          <p className="text-gray-600">
            Fill in the details below to add a new staff member to the clinic
          </p>
        </header>

        {showSuccess && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
            <svg
              className="h-5 w-5 text-green-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <div>
              <p className="text-green-800 font-medium">
                Staff member added successfully!
              </p>
              <p className="text-green-700 text-sm">
                The new staff member has been added to the system.
              </p>
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Staff Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      className="pl-10 border-gray-200 focus:ring-2 focus:ring-emerald-500"
                      {...register("fName")}
                    />
                  </div>
                  {errors.fName && (
                    <p className="text-sm text-red-600">
                      {errors.fName.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    className="border-gray-200 focus:ring-2 focus:ring-emerald-500"
                    {...register("lName")}
                  />
                  {errors.lName && (
                    <p className="text-sm text-red-600">
                      {errors.lName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      className="pl-10 border-gray-200 focus:ring-2 focus:ring-emerald-500"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      className="pl-10 border-gray-200 focus:ring-2 focus:ring-emerald-500"
                      {...register("phoneNumber")}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-600">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Role & Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <select
                      id="role"
                      className="w-full p-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      {...register("role")}
                    >
                      <option value="">Select role</option>
                      <option value="physician">Physician</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="nurse">Nurse</option>
                    </select>
                  </div>
                  {errors.role && (
                    <p className="text-sm text-red-600">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <select
                      id="department"
                      className="w-full p-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      {...register("department")}
                    >
                      <option value="">Select department</option>
                      <option value="generalMedication">
                        General Medicine
                      </option>
                      <option value="emergency">Emergency</option>
                      <option value="lab">Laboratory</option>
                      <option value="cardiology">Cardiology</option>
                    </select>
                  </div>
                  {errors.department && (
                    <p className="text-sm text-red-600">
                      {errors.department.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Employment Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="border-gray-200 focus:ring-2 focus:ring-emerald-500"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Availability */}
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <select
                    id="availability"
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    {...register("availability")}
                  >
                    <option value="full_time">Full-time</option>
                    <option value="part_time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                  {errors.availability && (
                    <p className="text-sm text-red-600">
                      {errors.availability.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  className="text-gray-600 border-gray-200 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding Staff...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Add Staff Member
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddStaffForm;
