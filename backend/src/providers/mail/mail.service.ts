import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { SendMailDto } from './dto';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendMail(sendMailDto: SendMailDto) {
    const { email, link, mailTitle, mailContentTitle } = sendMailDto;

    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get('smtp_user'),
      subject: mailTitle,
      text: '',
      html: `
        <div>
        <h1>${mailContentTitle}</h1>
        <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}
