import { config } from '@notifications/config';
import express, { Express } from 'express';
import { start } from '@notifications/server';
import { winstonLogger } from '@jahidhiron/jobber-shared';

const log = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationApp', 'debug');

function initialize(): void {
  const app: Express = express();
  start(app);
  log.info('Notification Service Initialized');
}
initialize();
