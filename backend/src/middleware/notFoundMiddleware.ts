import { Request, Response } from 'express';

/**
 * @summary
 * Handles requests for routes that do not exist (404 Not Found).
 * This should be placed after all other routes.
 */
export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 404,
      message: `Not Found - ${req.method} ${req.originalUrl}`,
    },
    timestamp: new Date().toISOString(),
  });
};
