import { Request, Response, NextFunction } from "express";

type ErrorWithStatusCode = Error & {
  statusCode?: number;
};

export const errorHandler = (
  err: ErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.statusCode ?? 500).json({
    message: err.message || "Server Error",
  });
};
