import express from "express";
import {
  addStaff,
  deleteStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
} from "../controllers/staffController";
const router = express.Router();

router.post("/", addStaff);
router.get("/", getAllStaff);
router.get("/:userId", getStaffById);
router.put("/:userId", updateStaff);
router.delete("/:userId", deleteStaff);

export default router;

// /doctors
// /doctors/{id}
// /doctors/{id}/appointments
// /doctors/{id}/schedules
