import express from "express";
import {
  addPrescription,
  deletePrescription,
  getPrescriptionForPatient,
  updatePrescription,
} from "../controllers/prescriptionControllers";

const router = express.Router();

router.get("/:id", getPrescriptionForPatient);
router.post("/", addPrescription);
router.put("/:id", updatePrescription);
router.delete("/:id", deletePrescription);

export default router;
