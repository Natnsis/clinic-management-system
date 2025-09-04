import React from "react";
import StaffSidebar from "@/components/staff/StaffSidebar";

const StaffDashboard = () => {
  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Sidebar */}
      <StaffSidebar />

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-emerald-900">
            Welcome, Staff Member
          </h1>
          <p className="text-lg text-emerald-700 mt-2">
            Thank you for your dedication to patient care.
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-10 max-w-4xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-emerald-100 pb-4">
            About This Platform
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              This digital platform is designed to support your daily work and
              streamline administrative tasks, including patient records,
              appointment coordination, and medical documentation.
            </p>

            <p>
              It reduces paperwork, improves accuracy, and ensures that patient
              information is secure, up-to-date, and easily accessible when
              needed.
            </p>

            <p>
              <strong className="text-emerald-800">
                Every action you take on this platform is logged and contributes
                to your performance tracking.
              </strong>
              From updating records to attending appointments, your engagement
              and professionalism are monitored.
            </p>

            <p>
              Most importantly,{" "}
              <strong className="text-emerald-800">
                your service quality is evaluated through patient feedback
              </strong>
              . Each patient has the opportunity to share their experience, and
              these reviews are reviewed regularly by clinic management.
            </p>

            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mt-4">
              <strong>Reminder:</strong> Treat every interaction with
              professionalism, empathy, and care. Your role directly impacts
              patient trust and the clinic’s reputation.
            </p>

            <p className="text-sm text-gray-500 italic mt-6">
              Thank you for your commitment to excellence in healthcare.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-emerald-600">
          <p>Clinic Management System • Secure • HIPAA Compliant</p>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
