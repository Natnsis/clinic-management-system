import React, { useState } from "react";
import { User, Save, Edit, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StaffSidebar from "@/components/staff/StaffSidebar";

const StaffProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@clinic.edu",
    phone: "+1 (555) 123-4567",
    employeeId: "EMP12345",
    department: "General Medicine",
    role: "Physician",
    licenseNumber: "MD123456",
    specialization: "Internal Medicine",
    yearsOfExperience: "8",
    education: "MD, Harvard Medical School",
    officeLocation: "Main Clinic - Room 101",
    officeHours: "Mon-Fri, 9:00 AM - 5:00 PM",
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values in a real app
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <StaffSidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <User className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-bold text-amber-900">Profile</h1>
          </div>
          <p className="text-amber-700">
            Manage your professional information and credentials
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
                Profile updated successfully!
              </p>
              <p className="text-green-700 text-sm">
                Your profile information has been saved.
              </p>
            </div>
          </div>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Professional Information</CardTitle>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-amber-600 border-amber-200 hover:bg-amber-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="text-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Profile Picture Section */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {profile.firstName.charAt(0)}
                    {profile.lastName.charAt(0)}
                  </span>
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 h-8 w-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                    <Upload className="h-4 w-4 text-white" />
                  </button>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-900">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-amber-700">{profile.role}</p>
                <p className="text-sm text-amber-600">
                  Employee ID: {profile.employeeId}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-amber-900 border-b border-amber-200 pb-2">
                  Personal Details
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900">{profile.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900">{profile.lastName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <p className="text-amber-900 font-mono">
                    {profile.employeeId}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  {isEditing ? (
                    <Input
                      id="licenseNumber"
                      value={profile.licenseNumber}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          licenseNumber: e.target.value,
                        }))
                      }
                      className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900">{profile.licenseNumber}</p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-amber-900 border-b border-amber-200 pb-2">
                  Contact Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900">{profile.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900">{profile.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officeLocation">Office Location</Label>
                  {isEditing ? (
                    <Input
                      id="officeLocation"
                      value={profile.officeLocation}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          officeLocation: e.target.value,
                        }))
                      }
                      className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900">{profile.officeLocation}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officeHours">Office Hours</Label>
                  {isEditing ? (
                    <Input
                      id="officeHours"
                      value={profile.officeHours}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          officeHours: e.target.value,
                        }))
                      }
                      className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900">{profile.officeHours}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-amber-200">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-amber-900">
                  Professional Details
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  {isEditing ? (
                    <select
                      id="role"
                      value={profile.role}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="Physician">Physician</option>
                      <option value="Nurse">Nurse</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Technician">Technician</option>
                    </select>
                  ) : (
                    <p className="text-amber-900">{profile.role}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  {isEditing ? (
                    <select
                      id="department"
                      value={profile.department}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          department: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="General Medicine">General Medicine</option>
                      <option value="Internal Medicine">
                        Internal Medicine
                      </option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Surgery">Surgery</option>
                    </select>
                  ) : (
                    <p className="text-amber-900">{profile.department}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  {isEditing ? (
                    <Input
                      id="specialization"
                      value={profile.specialization}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          specialization: e.target.value,
                        }))
                      }
                      className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900">{profile.specialization}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-amber-900">
                  Education & Experience
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  {isEditing ? (
                    <Input
                      id="education"
                      value={profile.education}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          education: e.target.value,
                        }))
                      }
                      className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900">{profile.education}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  {isEditing ? (
                    <Input
                      id="yearsOfExperience"
                      type="number"
                      value={profile.yearsOfExperience}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          yearsOfExperience: e.target.value,
                        }))
                      }
                      className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900">
                      {profile.yearsOfExperience} years
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffProfile;
