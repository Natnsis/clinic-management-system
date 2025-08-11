import express from "express";
// import itemRoutes from "./routes/itemRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import config from "./config/config";

const app = express();

app.use(express.json());

// // Routes
// app.use("/api/items", itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

app.listen(config.port, () => console.log("hello to the back end!"));

export default app;

// /auth/login
// /auth/logout
// /auth/register
// /auth/refresh-token

// /patients
// /patients/{id}
// /patients/{id}/appointments
// /patients/{id}/medical-records

// /doctors
// /doctors/{id}
// /doctors/{id}/appointments
// /doctors/{id}/schedules

// /appointments
// /appointments/{id}
// /appointments/{id}/cancel
// /appointments/upcoming
// /appointments/past

// /medical-records
// /medical-records/{id}
// /medical-records/patient/{patientId}

// /prescriptions
// /prescriptions/{id}
// /prescriptions/patient/{patientId}

// /billing
// /billing/invoices
// /billing/invoices/{id}
// /billing/payments
// /billing/payments/{id}

// /departments
// /departments/{id}

// /notifications
// /notifications/{id}

// /reports/daily
// /reports/monthly
// /reports/annual
