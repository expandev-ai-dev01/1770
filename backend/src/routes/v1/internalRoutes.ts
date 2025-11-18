import { Router } from 'express';
import { authMiddleware } from '@/middleware/authMiddleware';

const router = Router();

/**
 * @summary Defines all internal (private) routes for API v1.
 * All routes defined here will be protected by the authMiddleware.
 * The base path for these routes is /api/v1/internal
 */

// Apply authentication middleware to all internal routes
router.use(authMiddleware);

// Example: router.use('/feature', featureRoutes);

// Health check for the internal API
router.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'internal-api', version: 'v1' });
});

export default router;
