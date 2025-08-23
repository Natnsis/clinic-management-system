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
  try {
    const appointmentInfo = req.body;
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

export async function deleteAppointments(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.appointments.delete({ where: { id } });
    res.status(200).json({ message: "appointment deleted successfully!" });
  } catch (e) {
    res.status(500).json({ message: "unable to delete the appointment" });
  }
}

export async function updateAppointment(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { appointmentInfo } = req.body;
    const updated = await prisma.appointments.update({
      where: { id },
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
      .json({ message: "appointment updated successfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "unable to update the appointment!" });
  }
}

export async function getAppointmentById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const appointment = await prisma.appointments.findUnique({ where: { id } });
    return res.status(200).json(appointment);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "appointment cant be fetched, try later!" });
  }
}

export async function getAppointmentByPatient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const appointments = await prisma.appointments.findMany({
      where: { patientId: id },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(appointments);
  } catch (e) {
    res.status(500).json({ message: "unable to fetch, try again later" });
  }
}

export async function getAppointmentByStaff(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const appointments = await prisma.appointments.findMany({
      where: { staffId: id },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(appointments);
  } catch (e) {
    res.status(500).json({ message: "unable to fetch, try again later" });
  }
}
