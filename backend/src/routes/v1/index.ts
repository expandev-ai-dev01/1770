import { Router } from 'express';
import externalRoutes from './externalRoutes';
import internalRoutes from './internalRoutes';

const router = Router();

/**
 * @summary Aggregates all routes for API version 1.
 */

// External (public) routes, e.g., /api/v1/external/...
router.use('/external', externalRoutes);

// Internal (authenticated) routes, e.g., /api/v1/internal/...
router.use('/internal', internalRoutes);

export default router;
