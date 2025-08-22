import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function addStaff(req: Request, res: Response) {
  try {
    const staffData = req.body;
    const hashedPassword = await bcrypt.hash(staffData.password, 10);
    await prisma.staff.create({
      data: {
        fName: staffData.fName,
        mName: staffData.mName,
        lName: staffData.lName,
        email: staffData.email,
        password: hashedPassword,
        department: staffData.department,
        role: staffData.role,
        status: staffData.status,
        availability: staffData.availability,
        phoneNumber: parseInt(staffData.phoneNumber),
      },
    });
    return res
      .status(201)
      .json({ message: "staff member added successfully!", staff: staffData });
  } catch (e) {
    return res.status(500).json({ message: "unable to add staff member!" });
  }
}

// id           String       @id @default(uuid())
//   fName        String
//   mName        String
//   lName        String
//   email        String       @unique
//   password     String
//   department   Department
//   role         Role
//   status       Status
//   availability Availability
//   phoneNumber  Int
//   createdAt    DateTime     @default(now())
//   updatedAt    DateTime     @updatedAt

// enum Department {
//   generalMedication
//   emergency
//   administration
//   lab
//   cardiology
// }

// enum Status {
//   active
//   inactive
// }

// enum Availability {
//   full_time
//   part_time
// }

// enum Role {
//   physician
//   nurse
//   receptionist
//   doctor
//   technician
// }
