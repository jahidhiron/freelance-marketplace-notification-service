import { IEmailLocals, winstonLogger } from '@jahidhiron/jobber-shared';
import { config } from '@notifications/config';
import { emailTemplates } from '@notifications/helpers';

const log = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransport', 'debug');

export async function sendEmail(template: string, receiverEmail: string, locals: IEmailLocals): Promise<void> {
  try {
    emailTemplates(template, receiverEmail, locals);
    log.info('Email sent successfully.');
  } catch (error) {
    log.log('error', 'NotificationService MailTransport sendEmail() method error:', error);
  }
}
