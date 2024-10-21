// src/middlewares/apiKeyMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { Config } from '../configs';

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;

  if (!apiKey) {
    return res.status(401).json({ message: 'API Key não fornecida.' });
  }

  if (apiKey !== Config.API_KEY) {
    return res.status(403).json({ message: 'API Key inválida.' });
  }

  next();
};

export default apiKeyMiddleware;
