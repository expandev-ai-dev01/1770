import { Request, Response, NextFunction } from 'express';
import { config } from '@/config';

interface AppError extends Error {
  statusCode?: number;
}

/**
 * @summary
 * Global error handling middleware.
 * Catches errors from route handlers and formats them into a consistent JSON response.
 */
export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(
    `[ERROR] ${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    error: {
      code: statusCode,
      message,
      ...(config.env === 'development' && { stack: err.stack }),
    },
    timestamp: new Date().toISOString(),
  });
};
