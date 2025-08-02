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
