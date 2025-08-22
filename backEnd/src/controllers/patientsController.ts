import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllPatients(req: Request, res: Response) {
  const patients = await prisma.patients.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (patients.length === 0)
    return res.status(200).json({ message: "No patients registered" });
  return res.status(200).json(patients);
}

export async function getPatientsById(req: Request, res: Response) {
  const { userId } = req.body;
  const patient = await prisma.patients.findUnique({
    where: { id: userId },
  });

  if (!patient)
    return res.status(404).json({ message: "User with that ID not found" });
  return res.status(200).json(patient);
}

export async function deletePatient(req: Request, res: Response) {
  const { userId } = req.body;
  try {
    await prisma.patients.delete({ where: { id: userId } });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(404).json({ message: "User not found or cannot delete" });
  }
}

export async function updatePatient(req: Request, res: Response) {
  const { userId, userInfo } = req.body;
  try {
    const updatedPatient = await prisma.patients.update({
      where: { id: userId },
      data: {
        fName: userInfo.fName,
        mName: userInfo.mName,
        lName: userInfo.lName,
        updatedAt: new Date(),
      },
    });

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedPatient });
  } catch (err) {
    return res.status(404).json({ message: "User not found or cannot update" });
  }
}
