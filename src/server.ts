import http from 'http';

import 'express-async-errors';
import { Application } from 'express';
import { Channel } from 'amqplib';
import { winstonLogger } from '@jahidhiron/jobber-shared';
import { config } from '@notifications/config';
import { healthRoutes } from '@notifications/routes';
import { createConnection } from '@notifications/queues/connection';
import { consumeAuthEmailMessages, consumeOrderEmailMessages } from '@notifications/queues/email.consumer';

const SERVER_PORT = 4001;
const log = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');

export function start(app: Application): void {
  startServer(app);
  app.use('', healthRoutes());
  startQueues();
  startElasticSearch();
}

async function startQueues(): Promise<void> {
  const emailChannel = (await createConnection()) as Channel;
  await consumeAuthEmailMessages(emailChannel);
  await consumeOrderEmailMessages(emailChannel);

  // const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=4d54s4d5s4d5s45`;
  // const messageDetails: IEmailMessageDetails = {
  //   receiverEmail: `${config.SENDER_EMAIL}`,
  //   verifyLink: verificationLink,
  //   template: 'verifyEmail'
  // };

  // await emailChannel.assertExchange('jobber-email-notification', 'direct');
  // const message = JSON.stringify(messageDetails);
  // emailChannel.publish('jobber-email-notification', 'auth-email', Buffer.from(message));
}

function startElasticSearch(): void {}

function startServer(app: Application): void {
  try {
    const httpServer = new http.Server(app);
    log.info(`Worker with process id of ${process.pid} on notification server has started`);

    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notification server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log('error', 'NotificationService startServer() method:', error);
  }
}
