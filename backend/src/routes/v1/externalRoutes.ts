import { Router } from 'express';

const router = Router();

/**
 * @summary Defines all external (public) routes for API v1.
 * These routes do not require authentication.
 * The base path for these routes is /api/v1/external
 */

// Example: router.use('/public-feature', publicFeatureRoutes);

// Health check for the external API
router.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'external-api', version: 'v1' });
});

export default router;
