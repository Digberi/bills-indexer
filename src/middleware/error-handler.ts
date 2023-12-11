import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';

export const errorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('error: ' + error.message);
  res.status(500).json({
    error: error.message,
  });
};
