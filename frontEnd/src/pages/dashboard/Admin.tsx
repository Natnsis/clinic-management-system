import AdminNavbar from "@/components/AdminNavbar";
import { AppointmentTable } from "@/components/AppointmentTable";
import { button, card, text } from "@/styles";

const Admin = () => {
  return (
    <div className="p-5">
      <AdminNavbar />
      <div className="flex w-full justify-between pb-5 ">
        <div className="border-r-1 w-full px-15">
          <p className={`text-center ${text.label}`}>This weeks treatments</p>
          <h1 className={`text-primary text-center ${text.heading}`}>1470</h1>
        </div>{" "}
        <div className="border-r-1 w-full px-15">
          <p className={`text-center ${text.label}`}>Todays number of visits</p>
          <h1 className={`text-primary text-center ${text.heading}`}>23</h1>
        </div>{" "}
        <div className="border-r-1 w-full px-15">
          <p className={`text-center ${text.label}`}>Number of Staff </p>
          <h1 className={`text-primary text-center ${text.heading}`}>4324</h1>
        </div>{" "}
        <div className="w-full px-15">
          <p className={`text-center ${text.label}`}>NUmber of students</p>
          <h1 className={`text-primary text-center ${text.heading}`}>3244</h1>
        </div>
      </div>

      <div className="mt-5 flex gap-5 ">
        <div className={`w-[30%] ${card.withBorder}`}>
          <div>
            <h1 className={text.heading}>Latest Feedbacks</h1>
          </div>
          <div className="mt-5 space-y-3 scrollable h-[40%]">
            <button className={button.secondary}>
              Natnael Sisay <span className={text.label}>4th year</span>
            </button>
            <button className={button.secondary}>
              Natnael Sisay <span className={text.label}>4th year</span>
            </button>
            <button className={button.secondary}>
              Natnael Sisay <span className={text.label}>4th year</span>
            </button>
            <button className={button.secondary}>
              Natnael Sisay <span className={text.label}>4th year</span>
            </button>
            <button className={button.secondary}>
              Natnael Sisay <span className={text.label}>4th year</span>
            </button>
            <button className={button.secondary}>
              Natnael Sisay <span className={text.label}>4th year</span>
            </button>
          </div>
        </div>
        <AppointmentTable />
      </div>
    </div>
  );
};

export default Admin;
