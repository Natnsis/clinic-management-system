import express from "express";
import {
  addPrescription,
  deletePrescription,
  getPrescription,
  getPrescriptionForPatient,
  updatePrescription,
} from "../controllers/prescriptionControllers";

const router = express.Router();
router.get("/", getPrescription);
router.get("/:id", getPrescriptionForPatient);
router.post("/", addPrescription);
router.put("/:id", updatePrescription);
router.delete("/:id", deletePrescription);

export default router;
