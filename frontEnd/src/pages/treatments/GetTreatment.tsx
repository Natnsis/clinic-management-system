import AdminNavbar from "@/components/AdminNavbar";
import Cases from "@/components/Cases";
import { input, text } from "@/styles";

const GetTreatment = () => {
  return (
    <div className="p-5">
      <AdminNavbar />
      <div className="flex justify-between">
        <h1 className={text.subheading}>Current Patient Cases</h1>
        <input
          type="text"
          placeholder="search by name"
          className={`${input.base} w-[1/3]`}
        />
      </div>

      <div className="w-full mt-5 pb-3 border-b-1">
        <div className="w-[1/3] flex">
          <div className="flex gap-1 items-center mr-10">
            <button className={text.link}>All</button>
            <p className={text.label}>0</p>
          </div>
          <div className="flex gap-1 items-center mr-10">
            <button className={text.link}>In Progress</button>
            <p className={text.label}>0</p>
          </div>
          <div className="flex gap-1 items-center mr-10">
            <button className={text.link}>Late</button>
            <p className={text.label}>0</p>
          </div>
          <div className="flex gap-1 items-center mr-10">
            <button className={text.link}>Completed</button>
            <p className={text.label}>0</p>
          </div>
        </div>
      </div>

      <Cases />
    </div>
  );
};

export default GetTreatment;
