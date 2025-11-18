import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { config } from '@/config';
import { errorMiddleware } from '@/middleware/errorMiddleware';
import { notFoundMiddleware } from '@/middleware/notFoundMiddleware';
import apiRoutes from '@/routes';

const app: Application = express();

// --- Core Middleware ---

// Security headers
app.use(helmet());

// Enable CORS with dynamic origin
app.use(cors(config.api.cors));

// Compress responses
app.use(compression());

// Parse JSON and URL-encoded bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// HTTP request logger
app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

// --- Health Check ---

// Root-level health check endpoint, not versioned
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// --- API Routes ---

// All API routes are prefixed with /api and versioned by the main router
app.use('/api', apiRoutes);

// --- Error Handling ---

// Handle 404 Not Found for any routes not matched above
app.use(notFoundMiddleware);

// Global error handler, must be the last middleware
app.use(errorMiddleware);

// --- Server Startup ---

const server = app.listen(config.api.port, () => {
  console.log(`🚀 Server running on port ${config.api.port} in ${config.env} mode`);
});

// Graceful shutdown logic
const gracefulShutdown = () => {
  console.log('SIGTERM received, closing server gracefully.');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default app;
