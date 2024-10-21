// src/configs/index.ts
import dotenv from 'dotenv';
import path from 'path';
import packageJs from '../../package.json';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function parseBoolean(value: string | undefined): boolean {
  return value?.toLowerCase() === 'true';
}

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;
const TZ = process.env.TZ || 'America/Sao_Paulo';
const FORMATTER_TIME = process.env.FORMATTER_TIME || 'DD/MM/YYYY HH:mm:ss';

const API_KEY = process.env.API_KEY || '';

const SERVICE_NAME = packageJs.name;
const SERVICE_VERSION = packageJs.version;
const SERVICE_DESCRIPTION = packageJs.description;

export const Config = {
  ...packageJs,
  SERVICE_NAME,
  SERVICE_VERSION,
  SERVICE_DESCRIPTION,
  BACKEND_URL,
  FRONTEND_URL,
  NODE_ENV,
  PORT,
  TZ,
  FORMATTER_TIME,
  API_KEY,
};
