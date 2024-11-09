import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { morganMiddleware } from "./middlewares/logger.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(morganMiddleware());

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is listening`);
    });
  })
  .catch((err) => {
    console.error(`error connecting db and server`);
  });

// routes
import heathCheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
import connectionRouter from "./routes/connections.routes.js";
app.use("/api/v1", heathCheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/connections", connectionRouter);
app.use(errorMiddleware);
