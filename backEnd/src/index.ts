require("dotenv").config();
import express, { Request, Response } from "express";
import authRouter from "./routes/authRoutes";
import patientsRoute from "./routes/patientRoutes";
import appointmentRoute from "./routes/appointmentRoutes";
import staffRoute from "./routes/staffRoutes";
import prescriptionsRoute from "./routes/prescriptionRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

//constants
const app = express();
const PORT = 4000;

const allowedOrigins = ["http://localhost:5173", "https://your-app.vercel.app"];
//built in middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// routes
app.use("/auth", authRouter);
app.use("/patients", patientsRoute);
app.use("/appointments", appointmentRoute);
app.use("/staff", staffRoute);
app.use("/prescriptions", prescriptionsRoute);
app.use("/feedbacks", feedbackRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the back end");
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4000");
});
