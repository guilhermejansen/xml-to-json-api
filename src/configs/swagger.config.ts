// src/configs/swagger.config.ts
import swaggerJsDoc from 'swagger-jsdoc';
import { Config } from '.';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: `${Config.name}`,
      version: `${Config.version}`,
      description: `${Config.description}`,
    },
    servers: [
      {
        url: `${Config.BACKEND_URL}/api/v1`,
        description: 'API para gerenciamento de dados',
      },
      {
        url: `${Config.BACKEND_URL}`,
        description: 'API para gerenciamento de autenticação',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
          description: 'API Key para autenticação',
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/routes/*/*.ts',
    './src/routes/*/*/*.ts',
    './dist/routes/*.js',
    './dist/routes/*/*.js',
    './dist/routes/*/*/*.js',
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
