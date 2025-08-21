require("dotenv").config();
import express from "express";
import authRouter from "./routes/authRoutes";

const app = express();
app.use(express.json);

app.use(express.json());
app.use("/auth", authRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// // Routes

// Global error handler (should be after routes)
