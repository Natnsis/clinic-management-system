import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Users,
  FileText,
  Calendar,
  Shield,
  Bell,
  Clock,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Trigger initial visibility for all sections
    setTimeout(() => setIsVisible((prev) => ({ ...prev, hero: true })), 100);
    setTimeout(
      () => setIsVisible((prev) => ({ ...prev, features: true })),
      300
    );
    setTimeout(
      () => setIsVisible((prev) => ({ ...prev, benefits: true })),
      500
    );
    setTimeout(
      () => setIsVisible((prev) => ({ ...prev, testimonials: true })),
      700
    );
    setTimeout(() => setIsVisible((prev) => ({ ...prev, cta: true })), 900);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-white rounded-full"></div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ClinicFlow
              </span>
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
              <a
                href="#testimonials"
                className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
              >
                Testimonials
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                >
                  Login
                </Button>
              </Link>

              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                Get Started
              </Button>
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
                  Streamline appointments, patient records, and staff management
                  in one intuitive platform designed for healthcare
                  professionals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-lg px-8 py-6 h-auto min-w-48">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-6 h-auto min-w-48"
                >
                  Login
                </Button>
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
                <div className="h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img
                    src="https://placehold.co/400x400/10b981/ffffff?text=Clinic+Team"
                    alt="Clinic Team"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-xl shadow-lg">
                  <div className="flex space-x-2">
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-teal-600" />
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
              Powerful Features for Modern Clinics
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to run your clinic efficiently and provide
              exceptional patient care
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
                  Smart Scheduling
                </h3>
                <p className="text-gray-600 mb-4">
                  Intuitive calendar interface with drag-and-drop functionality,
                  automated reminders, and conflict detection.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 text-emerald-500 mr-2" />
                    Real-time availability
                  </li>
                  <li className="flex items-center">
                    <Bell className="h-4 w-4 text-emerald-500 mr-2" />
                    Automated reminders
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 text-emerald-500 mr-2" />
                    Resource allocation
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
                  <FileText className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Patient Records
                </h3>
                <p className="text-gray-600 mb-4">
                  Secure, comprehensive electronic health records with
                  customizable templates and easy search functionality.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-teal-500 mr-2" />
                    HIPAA compliant
                  </li>
                  <li className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-teal-500 mr-2" />
                    Patient communication
                  </li>
                  <li className="flex items-center">
                    <Settings className="h-4 w-4 text-teal-500 mr-2" />
                    Custom templates
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
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Staff Management
                </h3>
                <p className="text-gray-600 mb-4">
                  Efficient team coordination with role-based access, shift
                  scheduling, and performance tracking.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Settings className="h-4 w-4 text-emerald-500 mr-2" />
                    Role permissions
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 text-emerald-500 mr-2" />
                    Time tracking
                  </li>
                  <li className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-emerald-500 mr-2" />
                    Internal messaging
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
                src="https://placehold.co/600x400/10b981/ffffff?text=Clinic+Dashboard"
                alt="Clinic Dashboard"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Transform Your Clinic Operations
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  ClinicFlow helps you save time, reduce errors, and focus on
                  what matters most - patient care.
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
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Save 15+ Hours Weekly
                    </h3>
                    <p className="text-gray-600">
                      Automate administrative tasks and reduce paperwork by up
                      to 70%
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
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Improve Patient Satisfaction
                    </h3>
                    <p className="text-gray-600">
                      Reduce wait times and enhance communication with automated
                      reminders
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
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Increase Revenue
                    </h3>
                    <p className="text-gray-600">
                      Optimize scheduling to fill 95%+ of appointment slots
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isVisible.testimonials
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg text-gray-600">
              See what clinic owners and managers are saying about ClinicFlow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              className={`border-none shadow-lg hover:shadow-xl transition-all duration-700 ease-out border-t-4 border-t-emerald-500 ${
                isVisible.testimonials
                  ? "opacity-100 -translate-y-0"
                  : "opacity-0 -translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="p-6">
                <div className="flex text-emerald-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "ClinicFlow has transformed our practice. We've reduced
                  administrative time by 60% and our patient satisfaction scores
                  have never been higher."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-emerald-600">SJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Dr. Sarah Johnson
                    </div>
                    <div className="text-sm text-gray-500">
                      Family Care Clinic
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className={`border-none shadow-lg hover:shadow-xl transition-all duration-700 ease-out border-t-4 border-t-teal-500 ${
                isVisible.testimonials
                  ? "opacity-100 -translate-y-0"
                  : "opacity-0 -translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="p-6">
                <div className="flex text-emerald-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "The implementation was seamless, and the support team is
                  exceptional. Our staff adapted quickly and now can't imagine
                  working without it."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-teal-600">MS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Michael Stevens
                    </div>
                    <div className="text-sm text-gray-500">
                      City Medical Group
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className={`border-none shadow-lg hover:shadow-xl transition-all duration-700 ease-out border-t-4 border-t-emerald-500 ${
                isVisible.testimonials
                  ? "opacity-100 -translate-y-0"
                  : "opacity-0 -translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="p-6">
                <div className="flex text-emerald-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "The reporting features give us insights we never had before.
                  We've optimized our scheduling and increased patient
                  throughput by 25%."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-emerald-600">EC</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Dr. Emily Chen
                    </div>
                    <div className="text-sm text-gray-500">Wellness Center</div>
                  </div>
                </div>
              </div>
            </Card>
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
            Ready to Transform Your Clinic?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Join thousands of healthcare providers who have streamlined their
            operations and improved patient care with ClinicFlow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
