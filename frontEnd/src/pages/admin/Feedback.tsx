import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  Star,
  Calendar as CalendarIcon,
  Search,
  Download,
  Eye,
  ThumbsUp,
  User,
} from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import {
  useAppointmentStore,
  useFeedbackStore,
  type Appointment,
  type Feedback,
} from "@/store/overallStore";

const Feedback = () => {
  const getFeedbacks = useFeedbackStore((state) => state.fetchItems);
  const feedbacks = useFeedbackStore((state) => state.items) as Feedback[];

  const getAppointments = useAppointmentStore((state) => state.fetchItems);
  const appointments = useAppointmentStore(
    (state) => state.items
  ) as Appointment[];

  useEffect(() => {
    getFeedbacks();
    getAppointments();
  }, [getFeedbacks, getAppointments]);

  const [responses, setResponses] = useState<Record<string, string>>({});
  const [showResponseForm, setShowResponseForm] = useState<
    Record<string, boolean>
  >({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Filter + sort
  const filteredFeedbacks = (feedbacks || [])
    .filter((f) => {
      const matchesSearch =
        f.patient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.content?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || f.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "date")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "rating") return (b.rate ?? 0) - (a.rate ?? 0);
      if (sortBy === "patient") return a.patient.localeCompare(b.patient, "en");
      return 0;
    });

  const handleResponseChange = (feedbackId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [feedbackId]: value }));
  };

  const handleSendResponse = (feedbackId: string) => {
    // TODO: send response + status update to backend
    alert(`Response sent for feedback #${feedbackId}`);
    setShowResponseForm((prev) => ({ ...prev, [feedbackId]: false }));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-500";
    if (rating === 3) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatusColor = (status: string) => {
    if (status === "reviewed") return "bg-green-100 text-green-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <MessageCircle className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Patient Feedback Management
            </h1>
          </div>
          <p className="text-gray-600">
            Review and respond to patient feedback to improve clinic services
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<MessageCircle className="h-6 w-6 text-emerald-600" />}
            label="Total Feedbacks"
            value={feedbacks?.length ?? 0}
            bg="emerald"
          />
          <StatCard
            icon={<ThumbsUp className="h-6 w-6 text-green-600" />}
            label="5-Star Ratings"
            value={feedbacks?.filter((f) => f.rate === 5).length ?? 0}
            bg="green"
          />
          <StatCard
            icon={<Star className="h-6 w-6 text-yellow-600" />}
            label="Average Rating"
            value={
              feedbacks?.length
                ? (
                    feedbacks.reduce((acc, f) => acc + (f.rate ?? 0), 0) /
                    feedbacks.length
                  ).toFixed(1)
                : "0.0"
            }
            bg="yellow"
          />
          <StatCard
            icon={<Eye className="h-6 w-6 text-blue-600" />}
            label="Pending Review"
            value={feedbacks?.filter((f) => f.status === "pending").length ?? 0}
            bg="blue"
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedbacks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="reviewed">Reviewed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="patient">Sort by Patient</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {feedback.patient
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "P"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {feedback.patient}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Patient ID: {feedback.patientId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < (feedback.rate ?? 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span
                        className={`ml-2 font-medium ${getRatingColor(
                          feedback.rate ?? 0
                        )}`}
                      >
                        {feedback.rate}/5
                      </span>
                    </div>

                    <span className="text-sm text-gray-500 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>

                    <span className="text-sm text-gray-500">
                      {feedback.department || "General"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      feedback.status
                    )}`}
                  >
                    {feedback.status === "reviewed" ? "Reviewed" : "Pending"}
                  </span>

                  {/* Respond / Mark Reviewed Button */}
                  <button
                    onClick={() => {
                      setShowResponseForm((prev) => ({
                        ...prev,
                        [feedback.id]: !prev[feedback.id],
                      }));
                      feedback.status = "reviewed"; // mark as reviewed
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>
                      {feedback.response ? "Edit Response" : "Respond"}
                    </span>
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {feedback.content}
              </p>

              {/* Response Form */}
              {showResponseForm[feedback.id] && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Response
                  </label>
                  <textarea
                    value={responses[feedback.id] || feedback.response || ""}
                    onChange={(e) =>
                      handleResponseChange(feedback.id, e.target.value)
                    }
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your response to this feedback..."
                  />
                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      onClick={() =>
                        setShowResponseForm((prev) => ({
                          ...prev,
                          [feedback.id]: false,
                        }))
                      }
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSendResponse(feedback.id)}
                      className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors text-sm"
                    >
                      Send Response
                    </button>
                  </div>
                </div>
              )}

              {/* Existing Response */}
              {feedback.response && !showResponseForm[feedback.id] && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex-1">
                      <p className="text-sm text-gray-700">
                        {feedback.response}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Response sent
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No feedback found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Small reusable component for stats cards
const StatCard = ({
  icon,
  label,
  value,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  bg: string;
}) => {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-100",
    green: "bg-green-100",
    yellow: "bg-yellow-100",
    blue: "bg-blue-100",
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center">
        <div
          className={`h-10 w-10 ${colors[bg]} rounded-xl flex items-center justify-center mr-4`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
