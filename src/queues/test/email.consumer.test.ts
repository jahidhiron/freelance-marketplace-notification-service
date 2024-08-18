import * as connection from '@notifications/queues/connection';
import { consumeAuthEmailMessages, consumeOrderEmailMessages } from '@notifications/queues/email.consumer';

jest.mock('@notifications/queues/connection');
jest.mock('@jahidhiron/jobber-shared');

describe('Email Consumer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('consumeAuthEmailMessages method', () => {
    it('should be called', async () => {
      const exchangeName = 'jobber-email-notification';
      const routingKey = 'auth-email';
      const queueName = 'auth-email-queue';

      const channel = {
        assertExchange: jest.fn(),
        bindQueue: jest.fn(),
        assertQueue: jest.fn(),
        consume: jest.fn(),
        publish: jest.fn()
      };

      jest.spyOn(channel, 'assertExchange');
      jest.spyOn(channel, 'assertQueue').mockReturnValue({ queue: queueName, messageCount: 0, consumerCount: 0 });
      jest.spyOn(channel, 'bindQueue');
      jest.spyOn(connection, 'createConnection').mockReturnValue(channel as never);

      const connectionChannel = await connection.createConnection();
      await consumeAuthEmailMessages(connectionChannel!);

      expect(connectionChannel!.assertExchange).toHaveBeenCalledWith(exchangeName, 'direct');
      expect(connectionChannel!.assertExchange).toHaveBeenCalledTimes(1);

      expect(connectionChannel!.assertQueue).toHaveBeenCalledWith(queueName, { durable: true, autoDelete: false });
      expect(connectionChannel!.assertQueue).toHaveBeenCalledTimes(1);

      expect(connectionChannel!.bindQueue).toHaveBeenCalledWith(queueName, exchangeName, routingKey);
      expect(connectionChannel!.bindQueue).toHaveBeenCalledTimes(1);

      expect(connectionChannel!.consume).toHaveBeenCalledTimes(1);
    });
  });

  describe('consumeOrderEmailMessages method', () => {
    it('should be called', async () => {
      const exchangeName = 'jobber-order-notification';
      const routingKey = 'order-email';
      const queueName = 'order-email-queue';

      const channel = {
        assertExchange: jest.fn(),
        bindQueue: jest.fn(),
        assertQueue: jest.fn(),
        consume: jest.fn(),
        publish: jest.fn()
      };

      jest.spyOn(channel, 'assertExchange');
      jest.spyOn(channel, 'assertQueue').mockReturnValue({ queue: queueName, messageCount: 0, consumerCount: 0 });
      jest.spyOn(channel, 'bindQueue');
      jest.spyOn(connection, 'createConnection').mockReturnValue(channel as never);

      const connectionChannel = await connection.createConnection();
      await consumeOrderEmailMessages(connectionChannel!);

      expect(connectionChannel!.assertExchange).toHaveBeenCalledWith(exchangeName, 'direct');
      expect(connectionChannel!.assertExchange).toHaveBeenCalledTimes(1);

      expect(connectionChannel!.assertQueue).toHaveBeenCalledWith(queueName, { durable: true, autoDelete: false });
      expect(connectionChannel!.assertQueue).toHaveBeenCalledTimes(1);

      expect(connectionChannel!.bindQueue).toHaveBeenCalledWith(queueName, exchangeName, routingKey);
      expect(connectionChannel!.bindQueue).toHaveBeenCalledTimes(1);

      expect(connectionChannel!.consume).toHaveBeenCalledTimes(1);
    });
  });
});
