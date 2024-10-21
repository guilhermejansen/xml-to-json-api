import app from './app';
import { Config } from './configs';
import { logger } from './utils/logger.util';

app.listen(Config.PORT, () => {
  logger.info(`>>|| BACKEND XML TO JSON API ||<<`);
  logger.info(
    `Autor: ${Config.author} | Repositório: ${Config.repository.url}`,
  );
});
