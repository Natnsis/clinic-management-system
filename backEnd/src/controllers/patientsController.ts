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
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Patient ID is required" });
    }
    const patient = await prisma.patients.findUnique({
      where: { id },
    });

    if (!patient)
      return res.status(404).json({ message: "User with that ID not found" });
    return res.status(200).json(patient);
  } catch (e) {
    res.status(500).json({ message: "internal error, try later again!" });
  }
}

export async function deletePatient(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    // Delete related records first
    await prisma.appointments.deleteMany({ where: { patientId: userId } });
    await prisma.records.deleteMany({ where: { patientId: userId } });
    await prisma.prescriptions.deleteMany({ where: { patientId: userId } });
    await prisma.feedbacks.deleteMany({ where: { patientId: userId } });
    await prisma.message.deleteMany({
      where: { OR: [{ patientId: userId }, { staffId: userId }] },
    });

    await prisma.patients.delete({ where: { id: userId } });

    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err: any) {
    console.error("Delete patient error:", err);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the patient" });
  }
}

export async function updatePatient(req: Request, res: Response) {
  try {
    const { userInfo } = req.body;
    const { userId } = req.params;
    const updatedPatient = await prisma.patients.update({
      where: { id: userId },
      data: {
        fName: userInfo.fName,
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
