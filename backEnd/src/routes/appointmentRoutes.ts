import express from "express";
import {
  addAppointments,
  deleteAppointments,
  getAllAppointments,
  getAppointmentById,
  getAppointmentByPatient,
  getAppointmentByStaff,
  updateAppointment,
} from "../controllers/appointmentControllers";

const router = express.Router();

router.post("/", addAppointments);
router.get("/", getAllAppointments);
router.delete("/:id", deleteAppointments);
router.put("/:id", updateAppointment);
router.get("/:id", getAppointmentById);
router.get("/:id", getAppointmentByPatient);
router.get("/:id", getAppointmentByStaff);

export default router;
