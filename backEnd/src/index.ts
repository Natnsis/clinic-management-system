require("dotenv").config();
import express, { Request, Response } from "express";
import authRouter from "./routes/authRoutes";
import patientsRoute from "./routes/patientRoutes";
import appointmentRoute from "./routes/appointmentRoutes";
import staffRoute from "./routes/staffRoutes";
import prescriptionsRoute from "./routes/prescriptionRoutes";
import recordRoute from "./routes/recordRoutes";

//constants
const app = express();
const PORT = 4000;

app.use(express.json());

// routes
app.use("/auth", authRouter);
app.use("/patients", patientsRoute);
app.use("/appointment", appointmentRoute);
app.use("/staff", staffRoute);
app.use("/prescriptions", prescriptionsRoute);
app.use("/records", recordRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the back end");
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4000");
});
