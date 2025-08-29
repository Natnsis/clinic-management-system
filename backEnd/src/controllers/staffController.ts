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

export async function getAllStaff(req: Request, res: Response) {
  try {
    const staffMembers = await prisma.staff.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(staffMembers);
  } catch (e) {
    return res.status(500).json({ message: "unable to get staff members!" });
  }
}

export async function deleteStaff(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    await prisma.staff.delete({ where: { id: userId } });
    res.status(200).json({ message: "staff member deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "unable to delete staff member!" });
  }
}

export async function getStaffById(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const staffMember = await prisma.staff.findUnique({
      where: { id: userId },
    });

    if (!staffMember) {
      return res.status(404).json({ error: "Staff member not found" });
    }
    res.status(200).json(staffMember);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to find staff member" });
  }
}

export async function updateStaff(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { userInfo } = req.body;
    await prisma.staff.update({
      where: { id: userId },
      data: {
        fName: userInfo.fName,
        lName: userInfo.lName,
        department: userInfo.department,
        role: userInfo.role,
        status: userInfo.status,
        availability: userInfo.availability,
        phoneNumber: parseInt(userInfo.phoneNumber),
        updatedAt: new Date(),
      },
    });
    return res
      .status(200)
      .json({ message: "user has been updated successfully!" });
  } catch (e) {
    res.status(500).json({ message: "unable to update the staff member!" });
  }
}
