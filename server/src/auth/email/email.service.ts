import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';
import * as config from 'config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const emailConfig = config.get('email');

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: emailConfig.GMAIL_ID,
        pass: emailConfig.GMAIL_PASSWORD,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = 'http://localhost:4000'; // TODO: config

    const url = `${baseUrl}/user/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: 'Stormit 가입인증 메일입니다.',
      html: `
        가입확인 버튼를 누르시면 Stormit 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
