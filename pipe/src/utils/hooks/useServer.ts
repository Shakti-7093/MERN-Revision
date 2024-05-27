import { Application, Request, Response, NextFunction } from "express";
import http from "http";
interface HookOptions {
  onStart?: () => void;
  onRequest?: (req: Request, res: Response, next: NextFunction) => void;
  onStop?: () => void;
}
export const useServer = (app: Application, options: HookOptions) => {
  const { onStart, onRequest, onStop } = options;

  if (onStart) {
    onStart();
  }

  if (onRequest) {
    app.use((req: Request, res: Response, next: NextFunction) => {
      onRequest(req, res, next);
    });
  }

  const stopServer = (server: http.Server) => {
    if (onStop) {
      server.on("close", onStop);
    }
  };

  return { stopServer };
};
