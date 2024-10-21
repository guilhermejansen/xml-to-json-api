// src/utils/HealthCheck.util.ts
import { Request, Response } from 'express';
import { Config } from '../configs';
import { logger } from './logger.util';

class HealthCheckUtils {
  static async health(req: Request, res: Response): Promise<void> {
    try {
      const allHealthy = true;

      const healthCheck = {
        uptime: process.uptime(),
        status: allHealthy ? 200 : 503,
        message: allHealthy
          ? `${Config.SERVICE_NAME}: Healthy`
          : `${Config.SERVICE_NAME}: Unhealthy`,
        version: Config.SERVICE_VERSION,
        description: Config.SERVICE_DESCRIPTION,
        env: Config.NODE_ENV,
      };

      logger.verbose(healthCheck);
      res.status(allHealthy ? 200 : 503).send({ status: healthCheck });
    } catch (e) {
      logger.error(e);
      res.status(503).send({ error: 'Serviços indisponíveis' });
    }
  }
}

export default HealthCheckUtils;
