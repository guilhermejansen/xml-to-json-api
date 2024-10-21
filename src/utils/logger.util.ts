// /src/utils/logger.util.ts
import colors from 'colors/safe';
import moment from 'moment-timezone';
import winston from 'winston';

import { Config } from '../configs';

colors.enable();

const timezoned = () => {
  return moment().tz(`${Config.TZ}`).format(`${Config.FORMATTER_TIME}`);
};

const consoleFormat = winston.format.printf(({ level, message, timestamp }) => {
  let colorFunction = colors.green;
  switch (level) {
    case 'error':
      colorFunction = colors.red;
      break;
    case 'warn':
      colorFunction = colors.yellow;
      break;
    case 'info':
      colorFunction = colors.green;
      break;
    case 'verbose':
      colorFunction = colors.magenta;
      break;
    case 'debug':
      colorFunction = colors.blue;
      break;
    default:
      break;
  }
  return `[${colors.bgBlack(colors.white(colors.bold(Config.SERVICE_NAME)))}][${colors.bgBlack(
    colors.cyan(Config.SERVICE_VERSION),
  )}][${colors.bgBlack(colors.yellow(timestamp))}][${colorFunction(colors.italic(level))}]: ${message}`;
});

export const logger = winston.createLogger({
  level: Config.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: timezoned,
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    consoleFormat,
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), consoleFormat),
    }),
    //new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    //new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});
