// /src/routes/health.routes.ts
import { Router } from 'express';
import HealthCheckUtils from '../utils/healthCheck.util';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Health Checks
 *   description: Verifica o estado geral da aplicação
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica o estado de saúde da aplicação.
 *     tags: [Health Checks]
 *     responses:
 *       200:
 *         description: A aplicação está saudável.
 */
router.get('/health', HealthCheckUtils.health);

export default router;
