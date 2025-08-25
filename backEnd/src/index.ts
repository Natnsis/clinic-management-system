require("dotenv").config();
import express, { Request, Response } from "express";
import authRouter from "./routes/authRoutes";
import patientsRoute from "./routes/patientRoutes";
import appointmentRoute from "./routes/appointmentRoutes";
import staffRoute from "./routes/staffRoutes";
import prescriptionsRoute from "./routes/prescriptionRoutes";
import recordRoute from "./routes/recordRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import cors from "cors";

//constants
const app = express();
const PORT = 4000;

//built in middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/auth", authRouter);
app.use("/patients", patientsRoute);
app.use("/appointment", appointmentRoute);
app.use("/staff", staffRoute);
app.use("/prescriptions", prescriptionsRoute);
app.use("/records", recordRoute);
app.use("/feedbacks", feedbackRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the back end");
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4000");
});
