import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { button, card, input, text } from "@/styles";
import { Hospital, Plus } from "lucide-react";

const StaffTable = () => {
  return (
    <div className={card.base}>
      <div className="flex justify-between items-center  border-b-1 pb-5">
        <div className="flex gap-3 items-center">
          <Hospital className="text-primary" />
          <p className={text.heading}>Available Staff Members</p>
        </div>
        <div>
          <input type="text" placeholder="search name" className={input.base} />
        </div>
        <button
          className={`flex gap-3 items-center text-white ${button.primary}`}
        >
          <Plus />
          <p>Add an Employee</p>
        </button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className={text.subheading}>Staff Id</TableHead>
            <TableHead className={text.subheading}>Full Name</TableHead>
            <TableHead className={text.subheading}>Email</TableHead>
            <TableHead className={text.subheading}>Phone Number</TableHead>
            <TableHead className={text.subheading}>Gender</TableHead>
            <TableHead className={text.subheading}>Position</TableHead>
            <TableHead className={text.subheading}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default StaffTable;
