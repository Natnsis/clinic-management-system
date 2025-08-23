import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPatientRecords(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const records = await prisma.records.findMany({
      where: { id },
    });
    res.status(200).json(records);
  } catch (e) {
    res.status(500).json({ message: "unable to fetch records" });
  }
}

export async function deleteRecords(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.records.delete({ where: { id } });
    res.status(500).json({ message: "record deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "unable to delete record!" });
  }
}

export async function addRecord(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { recordInfo } = req.body;
    await prisma.records.create({
      data: {
        treatment: recordInfo.treatment,
        illness: recordInfo.illness,
        patient: {
          connect: { id: id },
        },
      },
    });

    res.status(201).json({ message: "Record created successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create record" });
  }
}

export async function updateRecord(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { recordInfo } = req.body;
    await prisma.records.update({
      where: { id },
      data: {
        treatment: recordInfo.treatment,
        illness: recordInfo.illness,
        patient: {
          connect: { id: id },
        },
      },
    });
  } catch (e) {
    res.status(500).json({ message: "unable to update record" });
  }
}
