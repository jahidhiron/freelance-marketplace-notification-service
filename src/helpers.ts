import path from 'path';

import { IEmailLocals, winstonLogger } from '@jahidhiron/jobber-shared';
import { config } from '@notifications/config';
import Email from 'email-templates';
import nodemailer from 'nodemailer';

const log = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransportHelper', 'debug');

export async function emailTemplates(template: string, receiver: string, locals: IEmailLocals): Promise<void> {
  try {
    const smtpTransport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: config.SENDER_EMAIL,
        pass: config.SENDER_EMAIL_PASSWORD
      }
    });

    const email = new Email({
      message: {
        from: `Jobber App <${config.SENDER_EMAIL}>`
      },
      send: true,
      preview: false,
      transport: smtpTransport,
      views: {
        options: {
          extension: 'ejs'
        }
      },
      // juice: true -> help us to use inline css in the template
      juice: true,
      juiceResources: {
        // preserve !important
        preserveImportant: true,
        webResources: {
          relativeTo: path.join(__dirname, '../build')
        }
      }
    });

    await email.send({
      template: path.join(__dirname, '..', 'src/emails', template),
      message: { to: receiver },
      locals
    });
  } catch (error) {
    log.error(error);
  }
}
