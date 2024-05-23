import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
// import routes from "./routes";
import { notFound, errorHandler } from "./src/middlewares/index";
// import { connect, disconnect, drop, reset, seed } from "./src/db";
import * as mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());

mongoose.connect("mongodb://localhost:27017/pipe");

// app.use("/api", routes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = "Welcome to the Pipe API";
    res.json({ message });
  } catch (error) {
    next(error);
  }
});

app.use(notFound);
app.use(errorHandler);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("Error connecting to MongoDB: ", error);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
