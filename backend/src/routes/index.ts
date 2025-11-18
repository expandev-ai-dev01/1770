import { Router } from 'express';
import v1Routes from './v1';

const router = Router();

/**
 * @summary Main API router that handles versioning.
 * All API routes are prefixed with /api by the server.
 */

// Version 1 routes (e.g., /api/v1/...)
router.use('/v1', v1Routes);

// Future versions can be added here (e.g., /api/v2/...)
// import v2Routes from './v2';
// router.use('/v2', v2Routes);

export default router;
