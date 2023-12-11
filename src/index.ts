import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { Schema } from 'mongoose';

import { CURRENT_CHAIN, MONGO_URL, PORT } from './config/env';
import { logger } from './config/logger';
import { errorHandlerMiddleware } from './middleware/error-handler';
import { startIndexer } from './indexer/indexer';
import { router } from './router';
import { provider } from './config/const';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(errorHandlerMiddleware);
app.use('/api', router);

app.listen(PORT, async () => {
  logger.info(`Server started at port ${PORT} and chain ${CURRENT_CHAIN}`);
  await mongoose.connect(MONGO_URL);
  logger.info('Database connected');

  logger.info('Starting indexer');
  await startIndexer();
});
