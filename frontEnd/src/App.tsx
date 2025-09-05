import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  FileText,
  Users,
  MessageSquare,
  Shield,
  Clock,
  Bell,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    setTimeout(() => setIsVisible((prev) => ({ ...prev, hero: true })), 100);
    setTimeout(
      () => setIsVisible((prev) => ({ ...prev, features: true })),
      300
    );
    setTimeout(
      () => setIsVisible((prev) => ({ ...prev, benefits: true })),
      500
    );
    setTimeout(() => setIsVisible((prev) => ({ ...prev, cta: true })), 700);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50"
      id="home"
    >
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-white rounded-full"></div>
              </div>
              <a href="#home">
                <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ClinicFlow
                </span>
              </a>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
              >
                Benefits
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${
              isVisible.hero
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Modern Clinic
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {" "}
                    Management
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Streamline appointments, prescriptions, and patient feedback
                  in one intuitive platform — built for student clinics and
                  campus healthcare.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.linkedin.com/in/natnael-sisay-orcadev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-lg px-8 py-6 h-auto min-w-48">
                    Contact Developer
                  </Button>
                </a>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-6 h-auto min-w-48"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div
                className={`relative transition-all duration-1000 delay-200 ease-out ${
                  isVisible.hero
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/Doctors-bro.png"
                    alt="Doctor and Student Patient"
                    className="w-full h-auto max-w-xs md:max-w-sm object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-xl shadow-lg">
                  <div className="flex space-x-2">
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-teal-600" />
                    </div>
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isVisible.features
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Designed for Student Clinic Needs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything your campus clinic needs to replace paperwork and
              improve student healthcare access
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              className={`border-none shadow-lg hover:shadow-xl transition-all duration-700 ease-out border-t-4 border-t-emerald-500 ${
                isVisible.features
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="p-6">
                <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Smart Appointment Scheduling
                </h3>
                <p className="text-gray-600 mb-4">
                  Easy booking for students with real-time availability,
                  automated reminders, and staff assignment.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 text-emerald-500 mr-2" />
                    Time-slot optimization
                  </li>
                  <li className="flex items-center">
                    <Bell className="h-4 w-4 text-emerald-500 mr-2" />
                    SMS/email reminders
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 text-emerald-500 mr-2" />
                    Staff & room allocation
                  </li>
                </ul>
              </div>
            </Card>

            <Card
              className={`border-none shadow-lg hover:shadow-xl transition-all duration-700 ease-out border-t-4 border-t-teal-500 ${
                isVisible.features
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="p-6">
                <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Patient Feedback System
                </h3>
                <p className="text-gray-600 mb-4">
                  Collect student feedback after visits to improve care quality
                  and clinic operations.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-teal-500 mr-2" />
                    Anonymous surveys
                  </li>
                  <li className="flex items-center">
                    <Bell className="h-4 w-4 text-teal-500 mr-2" />
                    Automated feedback requests
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 text-teal-500 mr-2" />
                    Exportable reports
                  </li>
                </ul>
              </div>
            </Card>

            <Card
              className={`border-none shadow-lg hover:shadow-xl transition-all duration-700 ease-out border-t-4 border-t-emerald-500 ${
                isVisible.features
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="p-6">
                <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Prescription Control
                </h3>
                <p className="text-gray-600 mb-4">
                  Issue, track, and manage prescriptions with refill controls
                  and digital sharing.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-emerald-500 mr-2" />
                    Secure access
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 text-emerald-500 mr-2" />
                    Refill tracking
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 text-emerald-500 mr-2" />
                    Doctor & patient access
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${
              isVisible.benefits
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2389/2389770.png" // Dashboard-style illustration
                alt="Clinic Dashboard"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Built for Campus Clinics
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  ClinicFlow helps student healthcare providers reduce
                  paperwork, improve access, and deliver better care.
                </p>
              </div>

              <div className="space-y-6">
                <div
                  className={`flex items-start space-x-4 transition-all duration-700 ease-out ${
                    isVisible.benefits
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: "100ms" }}
                >
                  <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="h-5 w-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Replace Paperwork
                    </h3>
                    <p className="text-gray-600">
                      Go fully digital with records, prescriptions, and
                      feedback.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start space-x-4 transition-all duration-700 ease-out ${
                    isVisible.benefits
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <div className="h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="h-5 w-5 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Improve Student Access
                    </h3>
                    <p className="text-gray-600">
                      Easy online booking and digital prescriptions reduce wait
                      times.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start space-x-4 transition-all duration-700 ease-out ${
                    isVisible.benefits
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="h-5 w-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Open-Source Inspiration
                    </h3>
                    <p className="text-gray-600">
                      A project to inspire your campus to build similar systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-20 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000 ease-out ${
          isVisible.cta
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Digitize Your Campus Clinic?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Join the movement toward paperless, efficient, and student-centered
            healthcare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="https://www.linkedin.com/in/natnael-sisay-orcadev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
                Contact Developer
              </Button>
            </a>
            <Link to="/login">
              <Button
                variant="outline"
                className="border-2 border-white text-emerald-600 hover:bg-white/10 text-lg px-8 py-6 h-auto"
              >
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 text-sm leading-relaxed max-w-2xl mx-auto">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/natnael-sisay-orcadev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              Natnael Sisay
            </a>
            . A simple clinic management system project to motivate my former
            campus to build similar tools and enhance student healthcare
            experience by replacing paperwork with digital solutions.
          </p>
          <div className="mt-4 text-gray-500 text-xs">
            © {new Date().getFullYear()} ClinicFlow. Open-source for educational
            use.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
