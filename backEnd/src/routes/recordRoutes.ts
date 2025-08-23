import express from "express";
import {
  addRecord,
  deleteRecords,
  getPatientRecords,
  updateRecord,
} from "../controllers/recordsControllers";

const router = express.Router();

router.get("/:id", getPatientRecords);
router.delete("/:id", deleteRecords);
router.put("/:id", updateRecord);
router.post("/:id", addRecord);

export default router;
