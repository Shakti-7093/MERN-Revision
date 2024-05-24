import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
// import routes from "./routes";
import { notFound, errorHandler } from "./src/middlewares/index";
import dotenv from "dotenv";
import { connect, disconnect } from "./src/db";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());

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

const gracefulShutdown = async () => {
  try {
    disconnect();
    console.log("Mongoose connection closed due to app termination");
    process.exit(0);
  } catch (error) {
    console.error("Error during Mongoose disconnection", error);
    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

app.listen(3000, () => {
  connect();
  console.log("Server is listening on port 3000");
});
