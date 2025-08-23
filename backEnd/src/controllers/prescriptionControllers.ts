import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addPrescription(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { info } = req.body;
    await prisma.prescriptions.create({
      data: {
        patientId: id,
        staffId: info.staffId,
        medication: info.medication,
        detail: info.detail,
        duration: info.duration,
        refills: info.refills,
        frequency: info.frequency,
      },
    });
    return res
      .status(200)
      .json({ message: "prescriptions added successfully" });
  } catch (e) {
    return res.status(500).json({ message: "unable to add prescription!" });
  }
}

export async function updatePrescription(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { info } = req.body;
    await prisma.prescriptions.update({
      where: { id },
      data: {
        medication: info.medication,
        detail: info.detail,
        duration: info.duration,
        refills: info.refills,
        frequency: info.frequency,
      },
    });
    return res
      .status(200)
      .json({ message: "prescription updated successfully" });
  } catch (e) {
    return res.status(500).json({ message: "unable to update, try later!" });
  }
}

export async function deletePrescription(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.prescriptions.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: "prescription deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "unable to delete prescription" });
  }
}

export async function getPrescriptionForPatient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const patientPrescription = await prisma.prescriptions.findMany({
      where: { id },
    });
    return res.status(200).json(patientPrescription);
  } catch (e) {
    return res.status(500).json({ message: "unable to fetch prescriptions" });
  }
}


