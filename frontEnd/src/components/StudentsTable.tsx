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
import { Plus, School } from "lucide-react";

const StudentsTable = () => {
  return (
    <div className={card.base}>
      <div className="flex justify-between items-center  border-b-1 pb-5">
        <div className="flex gap-3 items-center">
          <School className="text-primary" />
          <p className={text.heading}>Availible students</p>
        </div>
        <div>
          <input type="text" placeholder="search name" className={input.base} />
        </div>
        <button
          className={`flex gap-3 items-center text-white ${button.primary}`}
        >
          <Plus />
          <p>Add A Student</p>
        </button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className={text.subheading}>Student Id</TableHead>
            <TableHead className={text.subheading}>Full Name</TableHead>
            <TableHead className={text.subheading}>Department</TableHead>
            <TableHead className={text.subheading}>Year</TableHead>
            <TableHead className={text.subheading}>Gender</TableHead>
            <TableHead className={text.subheading}>Emergency Contact</TableHead>
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

export default StudentsTable;
