import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import { connect, disconnect } from "./src/db";
import { useServer } from "./src/utils/hooks/useServer";
import cron from 'node-cron';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// Middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ error: "Not Found" });
  next();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
  next();
});

const serverHooks = useServer(app, {
  onStart: () => {
    console.log("Server is starting...");
  },
  onRequest: (req: Request, res: Response, next: NextFunction) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
  },
  onStop: () => {
    console.log("Server is stopping...");
  },
});

cron.schedule('*/10 * * * * *', () => {
  console.log('Running a task every 10 seconds');
  // Perform some task here to keep the API active
});

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  connect();
});

serverHooks.stopServer(server);

const handleExit = () => {
  server.close(() => {
    disconnect();
    console.log("Server has been closed.");
    process.exit(0);
  });
};

process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);
