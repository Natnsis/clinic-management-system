import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  MessageCircle,
  Shield,
  TrendingUp,
} from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import {
  useAppointmentStore,
  usePatientStore,
  useStaffStore,
  useFeedbackStore,
  type Appointment,
  type Feedback,
  type Patient,
} from "@/store/overallStore";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Fetch data from stores
  const patients = usePatientStore((state) => state.items) as
    | Patient[]
    | undefined;
  const appointments = useAppointmentStore((state) => state.items) as
    | Appointment[]
    | undefined;
  const feedbacks = useFeedbackStore((state) => state.items) as
    | Feedback[]
    | undefined;
  const staff = useStaffStore((state) => state.items) ?? [];

  const fetchPatients = usePatientStore((state) => state.fetchItems);
  const fetchAppointments = useAppointmentStore((state) => state.fetchItems);
  const fetchFeedbacks = useFeedbackStore((state) => state.fetchItems);

  useEffect(() => {
    fetchPatients();
    fetchAppointments();
    fetchFeedbacks();
  }, [fetchPatients, fetchAppointments, fetchFeedbacks]);

  // 🛡️ Ensure we always have arrays
  const safePatients = Array.isArray(patients) ? patients : [];
  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  const safeFeedbacks = Array.isArray(feedbacks) ? feedbacks : [];

  // 🔧 Safe date parser
  const parseDate = (dateStr: string | undefined | null) => {
    if (!dateStr) return new Date(0);
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date(0) : d;
  };

  // 🕒 Recent items (latest 5)
  const recentAppointments = [...safeAppointments]
    .sort(
      (a, b) =>
        parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime()
    )
    .slice(0, 5);

  const recentFeedbacks = [...safeFeedbacks]
    .sort(
      (a, b) =>
        parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime()
    )
    .slice(0, 5);

  // 📊 Stats
  const stats = {
    totalPatients: safePatients.length,
    newAppointments: safeAppointments.filter(
      (a) => parseDate(a.date) > new Date()
    ).length,
    pendingFeedbacks: safeFeedbacks.filter((f) => f.status === "pending")
      .length,
    activeStaff: Array.isArray(staff) ? staff.length : 0,
  };

  // 🧩 StatCard Component
  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    color = "emerald",
  }: {
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    trend?: string;
    color?: "emerald" | "teal" | "blue" | "purple";
  }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">
                {trend}% from last month
              </span>
            </div>
          )}
        </div>
        <div
          className={`h-12 w-12 bg-${color}-100 rounded-xl flex items-center justify-center`}
        >
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  // 📝 Feedback List (without action buttons)
  const FeedbackList = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Feedbacks
      </h3>
      {safeFeedbacks.length === 0 ? (
        <p className="text-gray-500">No feedbacks have been submitted yet.</p>
      ) : recentFeedbacks.length === 0 ? (
        <p className="text-gray-500">No recent feedbacks to display.</p>
      ) : (
        recentFeedbacks.map((f) => (
          <div key={f.id} className="p-4 bg-gray-50 rounded-xl mb-2">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-900">
                {f.patientId || "Unknown Patient"}
              </p>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  f.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {f.status?.charAt(0).toUpperCase() + f.status?.slice(1)}
              </span>
            </div>
            <p className="text-gray-600 line-clamp-2">
              {f.content || "No content provided."}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {f.createdAt
                ? new Date(f.createdAt).toLocaleDateString()
                : "Date not available"}
            </p>
          </div>
        ))
      )}
    </div>
  );

  // 📅 Appointment List
  const AppointmentList = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Appointments
      </h3>
      {safeAppointments.length === 0 ? (
        <p className="text-gray-500">No appointments scheduled yet.</p>
      ) : recentAppointments.length === 0 ? (
        <p className="text-gray-500">No recent appointments to show.</p>
      ) : (
        recentAppointments.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-2"
          >
            <div>
              <p className="font-medium text-gray-900">
                {a.patientId || "Unknown Patient"}
              </p>
              <p className="text-sm text-gray-500">
                {a.type || "Consultation"} • {a.time || "Time not set"}
              </p>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                parseDate(a.date) >= new Date()
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {a.date ? new Date(a.date).toLocaleDateString() : "Invalid Date"}
            </span>
          </div>
        ))
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Patients"
                value={stats.totalPatients}
                icon={Users}
                trend="12"
              />
              <StatCard
                title="New Appointments"
                value={stats.newAppointments}
                icon={Calendar}
                trend="8"
                color="teal"
              />
              <StatCard
                title="Pending Feedbacks"
                value={stats.pendingFeedbacks}
                icon={MessageCircle}
                trend="15"
                color="blue"
              />
              <StatCard
                title="Active Staff"
                value={stats.activeStaff}
                icon={Shield}
                trend="5"
                color="purple"
              />
            </div>

            {/* Recent Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AppointmentList />
              <FeedbackList />
            </div>
          </div>
        );
      default:
        return <p className="text-gray-600">Section not available.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Clinic Management Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, Administrator</p>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
