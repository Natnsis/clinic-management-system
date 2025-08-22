import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { resolveSoa } from "dns";

const prisma = new PrismaClient();

export async function getAllAppointments(req: Request, res: Response) {
  const appointmentList = await prisma.appointments.findMany({
    orderBy: { createdAt: "desc" },
  });
  if (appointmentList.length === 0)
    return res.status(200).json({ message: "no appointments found" });
  return res.status(200).json(appointmentList);
}

export async function addAppointments(req: Request, res: Response) {
  const appointmentInfo = req.body;
  try {
    await prisma.appointments.create({
      data: {
        patientId: appointmentInfo.pId,
        staffId: appointmentInfo.sId,
        reason: appointmentInfo.reason,
        status: appointmentInfo.status,
        note: appointmentInfo.note,
        location: appointmentInfo.location,
      },
    });

    return res
      .status(200)
      .json({ message: "successfully added an appointment" });
  } catch (e) {
    return res.status(500).json({ message: "unable to add appointment" });
  }
}

// id        String          @id @default(uuid())
//   patientId String
//   staffId   String
//   reason    String
//   status    AppointmentStatus
//   note      String? //notes might be added later
//   location  String
//   createdAt DateTime          @default(now())
//   updatedAt DateTime          @updatedAt

// enum AppointmentStatus {
//   confirmed
//   pending
//   canceled
// }
