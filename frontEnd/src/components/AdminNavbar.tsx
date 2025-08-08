import { text } from "@/styles";
import { Bell, CircleUser } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const AdminNavbar = () => {
  return (
    <div className="flex justify-between border-b-1 mb-10">
      <div className="flex gap-2 items-center">
        <img src="/logo.png" alt="logo" className="w-10" />
        <h1 className={text.heading}>HealNet</h1>
      </div>
      <div className="flex justify-between w-1/3">
        <Link to="/admin" className={text.link}>
          Dashboard
        </Link>
        <Link to="/admin" className={text.link}>
          Students
        </Link>
        <Link to="/admin" className={text.link}>
          Doctors
        </Link>
        <Link to="/admin" className={text.link}>
          Medications
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <Bell className=" text-primary" />
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUser className="text-secondary" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
