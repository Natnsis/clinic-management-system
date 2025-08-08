import AdminNavbar from "@/components/AdminNavbar";
import StaffTable from "@/components/StaffTable";
import React from "react";

const SearchStaff = () => {
  return (
    <div className="p-5">
      <AdminNavbar />
      <StaffTable />
    </div>
  );
};

export default SearchStaff;
