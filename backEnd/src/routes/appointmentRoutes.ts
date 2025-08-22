import express from "express";
import { addAppointments } from "../controllers/appointmentControllers";

const router = express.Router();

router.post("/", addAppointments);

export default router;

// /appointments
// /appointments/{id}
// /appointments/{id}/cancel
// /appointments/upcoming
// /appointments/past
