import express from "express";
import {
  deletePatient,
  getAllPatients,
  getPatientsById,
  updatePatient,
} from "../controllers/patientsController";

const router = express.Router();

router.get("/", getAllPatients);
router.get("/:id", getPatientsById);
router.delete("/:userId", deletePatient);
router.put("/:userId", updatePatient);

export default router;
// /patients/{id}/appointments
// /patients/{id}/medical-records
