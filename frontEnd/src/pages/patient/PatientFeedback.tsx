import React, { useState } from "react";
import {
  MessageCircle,
  Star,
  Calendar as CalendarIcon,
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/patient/Header";

const PatientFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data for previous appointments
  const recentAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      date: "June 15, 2023",
      type: "General Checkup",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dentistry",
      date: "May 10, 2023",
      type: "Dental Exam",
    },
    {
      id: 3,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Mental Health",
      date: "April 5, 2023",
      type: "Counseling Session",
    },
  ];

  // Mock submitted feedback
  const submittedFeedback = [
    {
      id: 1,
      doctor: "Dr. James Taylor",
      specialty: "Physical Therapy",
      date: "March 20, 2023",
      rating: 5,
      comment:
        "Excellent therapist! Very knowledgeable and helped me recover quickly from my injury.",
      status: "published",
    },
    {
      id: 2,
      doctor: "Dr. Lisa Anderson",
      specialty: "Cardiology",
      date: "February 15, 2023",
      rating: 4,
      comment:
        "Great doctor with thorough explanations. Waiting time could be a bit shorter though.",
      status: "published",
    },
  ];

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || !feedback.trim() || !selectedDoctor) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setRating(0);
      setFeedback("");
      setSelectedDoctor("");

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
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
              <MessageCircle className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Patient Feedback
              </h1>
            </div>
            <p className="text-gray-600">
              Share your experience with our healthcare providers to help us
              improve our services
            </p>
          </div>

          {showSuccess && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-green-800 font-medium">
                  Thank you for your feedback!
                </p>
                <p className="text-green-700 text-sm">
                  Your feedback has been submitted successfully.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Feedback Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Submit Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="doctor"
                        className="text-sm font-medium text-gray-700"
                      >
                        Select Doctor/Provider
                      </label>
                      <select
                        id="doctor"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="">Choose a provider</option>
                        {recentAppointments.map((apt) => (
                          <option key={apt.id} value={apt.doctor}>
                            {apt.doctor} - {apt.specialty} ({apt.date})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Rating
                      </label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 transition-colors ${
                                star <= (hoverRating || rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        {rating === 0
                          ? "Please select a rating"
                          : rating === 1
                          ? "Very Dissatisfied"
                          : rating === 2
                          ? "Dissatisfied"
                          : rating === 3
                          ? "Neutral"
                          : rating === 4
                          ? "Satisfied"
                          : "Very Satisfied"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="feedback"
                        className="text-sm font-medium text-gray-700"
                      >
                        Your Feedback
                      </label>
                      <Textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Please share your experience with the doctor, staff, facility, and overall service..."
                        className="min-h-32 border-gray-200 focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        Please be honest and constructive in your feedback
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        isSubmitting ||
                        rating === 0 ||
                        !feedback.trim() ||
                        !selectedDoctor
                      }
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Feedback
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Previous Feedback */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Your Previous Feedback</CardTitle>
                  <p className="text-sm text-gray-500">
                    See the feedback you've submitted in the past
                  </p>
                </CardHeader>
                <CardContent>
                  {submittedFeedback.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No feedback submitted yet
                      </h3>
                      <p className="text-gray-500">
                        After you submit feedback, it will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submittedFeedback.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {item.doctor}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {item.specialty}
                              </p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              {item.status}
                            </Badge>
                          </div>

                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < item.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              ({item.rating}/5)
                            </span>
                          </div>

                          <p className="text-sm text-gray-700 mb-2">
                            {item.comment}
                          </p>

                          <div className="flex items-center text-xs text-gray-400">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {item.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tips for Feedback */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Guidelines for Effective Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <ThumbsUp className="h-5 w-5 text-green-600 mr-2" />
                      What to Include
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Specific details about your experience</li>
                      <li>• What the provider did well</li>
                      <li>• Suggestions for improvement</li>
                      <li>• Your overall satisfaction level</li>
                      <li>• Impact on your health outcome</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <ThumbsDown className="h-5 w-5 text-red-600 mr-2" />
                      What to Avoid
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Personal attacks or offensive language</li>
                      <li>• Sharing confidential information</li>
                      <li>• Unverified claims or rumors</li>
                      <li>• Feedback about unrelated staff</li>
                      <li>• Duplicate submissions</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> All feedback is reviewed by our
                    quality team. Submissions containing inappropriate content
                    may not be published. Your identity will remain confidential
                    when feedback is shared publicly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFeedback;
