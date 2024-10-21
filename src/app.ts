import express from 'express';
import router from './routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.text({ type: 'application/xml', limit: '100mb' }));
app.use(router);
app.use(errorHandler);

export default app;
