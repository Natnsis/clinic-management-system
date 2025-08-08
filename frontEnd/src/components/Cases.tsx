import { card, text } from "@/styles";

const Cases = () => {
  const cases = [
    {
      studentId: "STU001",
      illness: "Migraine",
      treatmentType: "Medication",
      assignedStaff: "Dr. Dawit",
      visitDate: "2025-08-01",
      progressStatus: "Ongoing",
    },
    {
      studentId: "STU002",
      illness: "Sprained Ankle",
      treatmentType: "First Aid",
      assignedStaff: "Nurse Hanna",
      visitDate: "2025-08-02",
      progressStatus: "Completed",
    },
    {
      studentId: "STU003",
      illness: "Flu",
      treatmentType: "Medication",
      assignedStaff: "Dr. Leul",
      visitDate: "2025-08-03",
      progressStatus: "Ongoing",
    },
    {
      studentId: "STU004",
      illness: "Back Pain",
      treatmentType: "Referral",
      assignedStaff: "Dr. Dawit",
      visitDate: "2025-07-28",
      progressStatus: "Referred",
    },
    {
      studentId: "STU005",
      illness: "Fever",
      treatmentType: "Medication",
      assignedStaff: "Nurse Eyerusalem",
      visitDate: "2025-08-04",
      progressStatus: "Ongoing",
    },
    {
      studentId: "STU006",
      illness: "Headache",
      treatmentType: "Observation",
      assignedStaff: "Dr. Meron",
      visitDate: "2025-08-05",
      progressStatus: "Follow-up Needed",
    },
    {
      studentId: "STU007",
      illness: "Asthma",
      treatmentType: "Inhaler",
      assignedStaff: "Dr. Leul",
      visitDate: "2025-07-29",
      progressStatus: "Completed",
    },
    {
      studentId: "STU008",
      illness: "Allergy",
      treatmentType: "Antihistamines",
      assignedStaff: "Nurse Hanna",
      visitDate: "2025-08-01",
      progressStatus: "Ongoing",
    },
    {
      studentId: "STU009",
      illness: "Diarrhea",
      treatmentType: "Hydration Therapy",
      assignedStaff: "Dr. Dawit",
      visitDate: "2025-08-03",
      progressStatus: "Completed",
    },
    {
      studentId: "STU010",
      illness: "COVID-19 Symptoms",
      treatmentType: "Isolation & Referral",
      assignedStaff: "Dr. Meron",
      visitDate: "2025-07-30",
      progressStatus: "Referred",
    },
    {
      studentId: "STU011",
      illness: "Skin Rash",
      treatmentType: "Topical Cream",
      assignedStaff: "Nurse Eyerusalem",
      visitDate: "2025-08-06",
      progressStatus: "Ongoing",
    },
    {
      studentId: "STU012",
      illness: "Toothache",
      treatmentType: "Referral",
      assignedStaff: "Dr. Leul",
      visitDate: "2025-08-05",
      progressStatus: "Referred",
    },
    {
      studentId: "STU013",
      illness: "Nausea",
      treatmentType: "Medication",
      assignedStaff: "Nurse Hanna",
      visitDate: "2025-08-06",
      progressStatus: "Follow-up Needed",
    },
    {
      studentId: "STU014",
      illness: "Chest Pain",
      treatmentType: "Emergency Referral",
      assignedStaff: "Dr. Dawit",
      visitDate: "2025-08-02",
      progressStatus: "Referred",
    },
    {
      studentId: "STU015",
      illness: "Eye Infection",
      treatmentType: "Medication",
      assignedStaff: "Nurse Eyerusalem",
      visitDate: "2025-08-07",
      progressStatus: "Ongoing",
    },
  ];

  return (
    <>
      {cases.map((caseItem, index) => (
        <div className={`my-5 ${card.withBorder}`} key={index}>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <p className={text.label}>{caseItem.studentId}</p>
              <p>-</p>
              <p>{caseItem.assignedStaff}</p>
            </div>
            <div>
              <p>{caseItem.visitDate}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p>{caseItem.illness}</p>
            </div>
            <div>
              <p>{caseItem.treatmentType}</p>
            </div>
          </div>

          <div>
            <p>{caseItem.progressStatus}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Cases;
