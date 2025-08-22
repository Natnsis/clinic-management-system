import express from "express";
import { addStaff } from "../controllers/staffController";
const router = express.Router();

router.post("/", addStaff);
router.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

export default router;

// /doctors
// /doctors/{id}
// /doctors/{id}/appointments
// /doctors/{id}/schedules
