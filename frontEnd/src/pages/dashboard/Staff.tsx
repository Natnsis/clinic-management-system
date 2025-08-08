import { PatientsTable } from "@/components/Patients";
import StaffSidebar from "@/components/StaffSidebar";
import { button, card, input, text } from "@/styles";
import { Bell, CircleUser, Plus } from "lucide-react";

const Staff = () => {
  return (
    <div className="flex w-screen">
      <div className="border-r-1 p-5">
        <h1 className={text.heading}>Mondays</h1>
        <StaffSidebar />
      </div>
      <div className="w-full">
        <div className="border-b-1 flex px-3 py-2 justify-between">
          <div>
            <input
              type="text"
              className={input.base}
              placeholder="search for students"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className={`flex gap-1 ${button.primary}`}>
              <Plus /> <p>New Message</p>
            </button>
            <button className="text-primary">
              <Bell />
            </button>
            <CircleUser className="text-primary" />
          </div>
        </div>
        <div className="px-5 py-10 ">
          <p className={text.label}>Thursday, 20th February</p>
          <h1 className={`text-4xl ${text.heading}`}>Good Evening! John,</h1>
        </div>
        <div className="px-5">
          <PatientsTable />
        </div>
        <div className="flex px-5 gap-5 w-full mt-10">
          <div className={`w-full ${card.withBorder}`}>
            <h1>Schedule</h1>
          </div>
          <div className={`w-full ${card.withBorder}`}>dsffsdf</div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
