import AdminNavbar from "@/components/AdminNavbar";
import { card, text } from "@/styles";

const Notifications = () => {
  const staffMessages = [
    {
      staffName: "Dr. Eleni Tesfaye",
      subject: "Request for Extra Bandages",
      messageBody:
        "We're running low on sterile bandages in the emergency room. Please restock at the earliest convenience.",
      type: "resource",
      status: "pending",
      requestDate: "2025-08-05T09:20:00Z",
    },
    {
      staffName: "Nurse Dawit Alemu",
      subject: "Broken Thermometer",
      messageBody:
        "One of the digital thermometers is malfunctioning. Requesting a replacement.",
      type: "incident",
      status: "resolved",
      requestDate: "2025-08-04T14:10:00Z",
    },
    {
      staffName: "Dr. Lulit Getachew",
      subject: "Suggestion for Night Shift Rotation",
      messageBody:
        "I'd like to propose a fairer rotation system for night shifts to reduce fatigue among doctors.",
      type: "suggestion",
      status: "read",
      requestDate: "2025-08-02T17:45:00Z",
    },
    {
      staffName: "Lab Technician Samuel Yonas",
      subject: "Shortage of Test Tubes",
      messageBody:
        "The lab is out of small test tubes. We need at least 100 units for upcoming student tests.",
      type: "resource",
      status: "pending",
      requestDate: "2025-08-06T08:30:00Z",
    },
    {
      staffName: "Nurse Hana Bekele",
      subject: "Incident During Student Checkup",
      messageBody:
        "A student fainted during a blood draw. No injuries, but reporting the case for documentation.",
      type: "incident",
      status: "read",
      requestDate: "2025-08-03T11:15:00Z",
    },
  ];

  const studentFeedback = [
    {
      studentId: "ASU2025001",
      studentName: "Mikiyas Tadesse",
      subject: "Great Service",
      messageBody:
        "The doctor was really kind and helpful. I was treated quickly without waiting long.",
      rating: 5,
      submittedAt: "2025-08-06T10:15:00Z",
    },
    {
      studentId: "ASU2025002",
      studentName: "Selam Tesfaye",
      subject: "Clean Environment",
      messageBody:
        "I really appreciate how clean and organized the clinic was. Keep it up!",
      rating: 4,
      submittedAt: "2025-08-06T11:45:00Z",
    },
    {
      studentId: "ASU2025003",
      studentName: "Abel Getahun",
      subject: "Delayed Response",
      messageBody:
        "I waited a bit too long before I was seen by the staff. Would appreciate faster response.",
      rating: 3,
      submittedAt: "2025-08-05T13:20:00Z",
    },
    {
      studentId: "ASU2025004",
      studentName: "Saron Fikru",
      subject: "Helpful Advice",
      messageBody:
        "The nurse gave great advice on how to handle recurring headaches. Very informative.",
      rating: 4,
      submittedAt: "2025-08-04T09:30:00Z",
    },
    {
      studentId: "ASU2025005",
      studentName: "Nahom Asfaw",
      subject: "Appreciation",
      messageBody:
        "Thank you for the quick treatment when I had food poisoning. I recovered fast.",
      rating: 5,
      submittedAt: "2025-08-03T16:50:00Z",
    },
  ];

  return (
    <div className="p-5 min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className={`${card.withBorder} p-6`}>
          <h1 className={`${text.heading} mb-4`}>
            Staff Messages & Resource Requests
          </h1>
          <div className="space-y-4">
            {staffMessages.map((msg, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 p-4 shadow-sm bg-white hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {msg.subject}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(msg.requestDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{msg.messageBody}</p>
                <div className="mt-3 flex justify-between text-sm text-gray-500">
                  <span>From: {msg.staffName}</span>
                  <span className="capitalize">{msg.type}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-white text-xs ${
                      msg.status === "pending"
                        ? "bg-yellow-500"
                        : msg.status === "resolved"
                        ? "bg-green-600"
                        : "bg-blue-500"
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${card.withBorder} p-6`}>
          <h1 className={`${text.heading} mb-4`}>Student Feedbacks</h1>
          <div className="space-y-4">
            {studentFeedback.map((fb, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 p-4 shadow-sm bg-white hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {fb.subject}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(fb.submittedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{fb.messageBody}</p>
                <div className="mt-3 flex justify-between text-sm text-gray-500">
                  <span>{fb.studentName}</span>
                  <span className="flex items-center gap-1">
                    Rating:{" "}
                    <span className="text-yellow-500 font-bold">
                      {Array(fb.rating).fill("★").join("")}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
