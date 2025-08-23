import express from "express";
import {
  deleteFeedback,
  getAllFeedbacks,
  getPatientFeedbackById,
  sendFeedback,
  updateFeedback,
} from "../controllers/feedbackControllers";
const router = express.Router();

router.post("/", sendFeedback);
router.get("/", getAllFeedbacks);
router.get("/", getPatientFeedbackById);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

export default router;
