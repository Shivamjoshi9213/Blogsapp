import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

// rest object
const app = express();
// dotenv config
dotenv.config();

// database config
connectDB();

// middlewares
app.use(cors("*"));
app.use(express.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.status(200).send("<h1>Radhe Radhe Padh liya kr </h1>");
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} port ${PORT}`.bgCyan
  );
});
// Sh!v@mjoshi
