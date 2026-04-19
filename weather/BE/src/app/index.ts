import cors from "cors";
import express from "express";
import weatherRoutes from "../routes/weatherRoutes";
import { errorHandler } from "../middleware/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoutes);

app.use(errorHandler);

export default app;
