// src/routes/swagger.routes.ts
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../configs/swagger.config';
import { Config } from '../configs';
import path from 'path';

const router = Router();

router.get('/docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

router.get('/docs/swagger-dark.css', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'swagger-dark.css'));
});

router.get('/docs/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'assets', 'favicon.ico'));
});

router.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    customCssUrl: '/docs/swagger-dark.css',
    customfavIcon: '/docs/favicon.ico',
    customSiteTitle: `${Config.SERVICE_NAME} - Documentação API`,
  }),
);

export default router;
