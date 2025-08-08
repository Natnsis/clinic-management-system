import { text } from "@/styles";
import {
  Activity,
  ClipboardClock,
  ClipboardList,
  LayoutDashboard,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

const StaffSidebar = () => {
  return (
    <div className="mt-10 space-y-5">
      <Link to="" className={`flex gap-1 items-center ${text.link}`}>
        <LayoutDashboard />
        <h1>Dashboard</h1>
      </Link>
      <Link to="" className={`flex gap-1 items-center ${text.link}`}>
        <ClipboardClock />
        <h1>Appointments</h1>
      </Link>
      <Link to="" className={`flex gap-1 items-center ${text.link}`}>
        <ClipboardList />
        <h1>Cases</h1>
      </Link>
      <Link to="" className={`flex gap-1 items-center ${text.link}`}>
        <Mail />
        <h1>Report</h1>
      </Link>
      <Link to="" className={`flex gap-1 items-center ${text.link}`}>
        <Activity />
        <h1>My Patients</h1>
      </Link>
    </div>
  );
};

export default StaffSidebar;
