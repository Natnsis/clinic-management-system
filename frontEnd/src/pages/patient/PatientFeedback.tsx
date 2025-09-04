import React, { useEffect, useState } from "react";
import { MessageCircle, Star, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/patient/Header";
import {
  useFeedbackStore,
  useStaffStore,
  type Staff,
} from "@/store/overallStore";
import { useAuthStore } from "@/store/authStore";

const PatientFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const staff = useStaffStore((state) => state.items) as Staff[];
  const getStaff = useStaffStore((state) => state.fetchItems);
  console.log(staff);
  const user = useAuthStore((state) => state.user);
  const patientId = user?.userId;

  const addFeedback = useFeedbackStore((state) => state.addItem);

  useEffect(() => {
    getStaff();
  }, [getStaff]);

  const handleRating = (value: number) => setRating(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || rating === 0 || !feedbackText.trim()) return;

    const staffMember = staff.find((s) => s.fName === selectedDoctor);
    if (!staffMember) return;

    const data = {
      patientId,
      staffId: staffMember.id,
      status: "pending", // pending for now
      content: feedbackText,
      rate: rating,
    };

    setIsSubmitting(true);
    try {
      await addFeedback(data);
      setShowSuccess(true);
      setFeedbackText("");
      setSelectedDoctor("");
      setRating(0);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center space-x-3">
          <MessageCircle className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Patient Feedback</h1>
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

        <Card>
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Select Doctor/Provider
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a provider</option>
                  {staff.map((s) => (
                    <option key={s.id} value={s.fName}>
                      {s.lName} - {s.role}
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Your Feedback
                </label>
                <Textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Please share your experience..."
                  className="min-h-32 border-gray-200 focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  rating === 0 ||
                  !feedbackText ||
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
    </div>
  );
};

export default PatientFeedback;
