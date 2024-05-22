import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes";
import { notFound, errorHandler } from "./middlewares/index";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use("/api", routes);

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

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
