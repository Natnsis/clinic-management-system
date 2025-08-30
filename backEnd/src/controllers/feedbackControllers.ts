import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function sendFeedback(req: Request, res: Response) {
  try {
    const { patientId, status, content, rate } = req.body;
    await prisma.feedbacks.create({
      data: {
        patientId,
        status,
        content,
        rate: parseInt(rate),
      },
    });
    return res.status(200).json({ message: "feedback sent successfully!" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "unable to send feedback, try again later!" });
  }
}

export async function deleteFeedback(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.feedbacks.delete({ where: { id } });
    return res.status(200).json({ message: "feedback deleted successfully" });
  } catch (e) {
    return res.status(500).json({ message: "unable to delete feedback!" });
  }
}

export async function updateFeedback(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, content, rate } = req.body;

    await prisma.feedbacks.update({
      where: { id },
      data: {
        status,
        content,
        rate: parseInt(rate),
      },
    });
  } catch (e) {
    return res.status(500).json({ message: "unable to update feedback!" });
  }
}

export async function getAllFeedbacks(req: Request, res: Response) {
  try {
    const feedbacks = await prisma.feedbacks.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(feedbacks);
  } catch (e) {
    return res.status(500).json({ message: "unable to update feedback!" });
  }
}

export async function getPatientFeedbackById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const patientFeedbacks = await prisma.feedbacks.findMany({
      where: { patientId: id },
    });
    return res.status(200).json({ patientFeedbacks });
  } catch (e) {
    return res.status(500).json({ message: "unable fetch feedbacks!" });
  }
}
