// /src/routes/index.ts
import { Router } from 'express';
import xmlRoutes from './xml.routes';
import HealthCheckUtils from '../utils/healthCheck.util';
import swaggerRoutes from './swagger.routes';

const router = Router();

router.get('/health', HealthCheckUtils.health);

router.use(swaggerRoutes);

router.use('/api/v1', xmlRoutes);

export default router;
