import express from "express";
import { login, refresh, register } from "../controllers/authControllers";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

export default router;
