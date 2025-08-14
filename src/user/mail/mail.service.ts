import { Injectable } from '@nestjs/common';

export class MailService {
  send() {
    console.log('Send Email');
  }
}

export const mailService = new MailService();
