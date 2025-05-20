import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import bookRouter from "./routes/BookRoutes.js";
import userRouter from "./routes/PublicRouter.js";

// load environment variables
dotenv.config();

// connect to mongodb
connectDB();

// initialize express app
const app = express();

// middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, Please try again after 15 minutes",
});

app.use(limiter);

// serve uploaded files
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// If a user accesses a URL like http://localhost:3000/uploads/image.jpg, the server will look for the file image.jpg in the uploads directory and serve it to the client.
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    next();
  },
  express.static(path.join(_dirname, "uploads"))
);

// routes
app.use("/api/books", bookRouter);
app.use("/api/public", userRouter);

// PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // console.log(`server running at http://localhost:${PORT}`);
});
