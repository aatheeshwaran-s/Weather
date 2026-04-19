import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./connection";

dotenv.config();

const start = async () => {
  await connectDB();
  
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

start();
