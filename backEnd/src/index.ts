require("dotenv").config();
import express, { Request, Response } from "express";
import authRouter from "./routes/authRoutes";
import patients from "./routes/patientRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// routes
app.use("/auth", authRouter);
app.use("/patients", patients);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the back end");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
