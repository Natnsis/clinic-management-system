import React, { useState } from "react";
import { User, Save, Edit, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/patient/Header";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    studentId: "STU12345",
    department: "Computer Science",
    year: "3rd Year",
    dateOfBirth: "1998-05-15",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1 (555) 987-6543",
    insuranceProvider: "University Health Plan",
    policyNumber: "UHP123456789",
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-16">
        {" "}
        {/* Offset for fixed header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <User className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            </div>
            <p className="text-gray-600">
              Manage your personal information and contact details
            </p>
          </div>

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
              <CardTitle>Personal Information</CardTitle>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
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
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
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
                  <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {profile.firstName.charAt(0)}
                      {profile.lastName.charAt(0)}
                    </span>
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
                      <Upload className="h-4 w-4 text-white" />
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-gray-600">{profile.studentId}</p>
                  <p className="text-sm text-gray-500">
                    {profile.department} • {profile.year}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
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
                        className="border-gray-200 focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.firstName}</p>
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
                        className="border-gray-200 focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.lastName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            dateOfBirth: e.target.value,
                          }))
                        }
                        className="border-gray-200 focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {new Date(profile.dateOfBirth).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
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
                        className="border-gray-200 focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.email}</p>
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
                        className="border-gray-200 focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    {isEditing ? (
                      <Input
                        id="emergencyContact"
                        value={profile.emergencyContact}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            emergencyContact: e.target.value,
                          }))
                        }
                        className="border-gray-200 focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {profile.emergencyContact}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                    {isEditing ? (
                      <Input
                        id="emergencyPhone"
                        value={profile.emergencyPhone}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            emergencyPhone: e.target.value,
                          }))
                        }
                        className="border-gray-200 focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.emergencyPhone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic & Insurance Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Academic Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <p className="text-gray-900 font-mono">
                      {profile.studentId}
                    </p>
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
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="Computer Science">
                          Computer Science
                        </option>
                        <option value="Engineering">Engineering</option>
                        <option value="Business">Business</option>
                        <option value="Arts">Arts</option>
                        <option value="Science">Science</option>
                        <option value="Medicine">Medicine</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{profile.department}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Academic Year</Label>
                    {isEditing ? (
                      <select
                        id="year"
                        value={profile.year}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            year: e.target.value,
                          }))
                        }
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{profile.year}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Insurance Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">
                      Insurance Provider
                    </Label>
                    {isEditing ? (
                      <Input
                        id="insuranceProvider"
                        value={profile.insuranceProvider}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            insuranceProvider: e.target.value,
                          }))
                        }
                        className="border-gray-200 focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {profile.insuranceProvider}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="policyNumber">Policy Number</Label>
                    {isEditing ? (
                      <Input
                        id="policyNumber"
                        value={profile.policyNumber}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            policyNumber: e.target.value,
                          }))
                        }
                        className="border-gray-200 focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.policyNumber}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
