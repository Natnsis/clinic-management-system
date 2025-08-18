import React, { useState } from "react";
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

const Feedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Mock feedback data
  const feedbacks = [
    {
      id: 1,
      patient: "John Doe",
      patientId: "STU12345",
      rating: 5,
      comment:
        "Excellent service and very professional staff. The doctor took time to explain everything clearly.",
      date: "2023-06-15",
      status: "reviewed",
      department: "General Medicine",
      response:
        "Thank you for your feedback, John. We are glad to hear about your positive experience.",
    },
    {
      id: 2,
      patient: "Jane Smith",
      patientId: "STU67890",
      rating: 4,
      comment:
        "Good experience, waiting time could be shorter. Staff was friendly and helpful.",
      date: "2023-06-14",
      status: "pending",
      department: "Dental Clinic",
      response: "",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      patientId: "STU11223",
      rating: 5,
      comment:
        "Dr. Smith is amazing! Highly recommend. The clinic is well-organized and clean.",
      date: "2023-06-13",
      status: "reviewed",
      department: "Cardiology",
      response:
        "We appreciate your kind words, Robert. Dr. Smith will be happy to hear this!",
    },
    {
      id: 4,
      patient: "Lisa Anderson",
      patientId: "STU44556",
      rating: 3,
      comment:
        "Average experience. The doctor was knowledgeable but seemed rushed during the appointment.",
      date: "2023-06-12",
      status: "pending",
      department: "General Medicine",
      response: "",
    },
    {
      id: 5,
      patient: "Michael Chen",
      patientId: "STU77889",
      rating: 5,
      comment:
        "Outstanding care! The follow-up process was excellent and very thorough.",
      date: "2023-06-11",
      status: "reviewed",
      department: "Physical Therapy",
      response:
        "Thank you for recognizing our follow-up process, Michael. We strive for excellence in patient care.",
    },
    {
      id: 6,
      patient: "Sarah Wilson",
      patientId: "STU99001",
      rating: 2,
      comment:
        "Long waiting time and staff seemed overwhelmed. Needs improvement in patient flow management.",
      date: "2023-06-10",
      status: "pending",
      department: "Emergency",
      response: "",
    },
  ];

  const [responses, setResponses] = useState({});
  const [showResponseForm, setShowResponseForm] = useState({});

  const filteredFeedbacks = feedbacks
    .filter((feedback) => {
      const matchesSearch =
        feedback.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.comment.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || feedback.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "patient") return a.patient.localeCompare(b.patient);
      return 0;
    });

  const handleResponseChange = (feedbackId, value) => {
    setResponses((prev) => ({
      ...prev,
      [feedbackId]: value,
    }));
  };

  const handleSendResponse = (feedbackId) => {
    // In a real app, this would send to backend
    alert(`Response sent for feedback #${feedbackId}`);
    setShowResponseForm((prev) => ({
      ...prev,
      [feedbackId]: false,
    }));
    // Update status to reviewed
    // This would be handled by backend in real implementation
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-500";
    if (rating === 3) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatusColor = (status) => {
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
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                <MessageCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Feedbacks
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedbacks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <ThumbsUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  5-Star Ratings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedbacks.filter((f) => f.rating === 5).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    feedbacks.reduce((acc, f) => acc + f.rating, 0) /
                    feedbacks.length
                  ).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Review
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedbacks.filter((f) => f.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
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
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
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
                            i < feedback.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span
                        className={`ml-2 font-medium ${getRatingColor(
                          feedback.rating
                        )}`}
                      >
                        {feedback.rating}/5
                      </span>
                    </div>

                    <span className="text-sm text-gray-500 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {feedback.date}
                    </span>

                    <span className="text-sm text-gray-500">
                      {feedback.department}
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

                  <button
                    onClick={() =>
                      setShowResponseForm((prev) => ({
                        ...prev,
                        [feedback.id]: !prev[feedback.id],
                      }))
                    }
                    className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{feedback.response ? "Edit" : "Respond"}</span>
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {feedback.comment}
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
                   setting className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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

export default Feedback;
