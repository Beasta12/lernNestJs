import {
  Controller,
  Get,
  Header,
  HttpCode,
  Inject,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common';
import type { Response, Request } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    private userRepository: UserRepository,
    @Inject('EmailService') private emailService: MailService,
    private memberService: MemberService,
  ) {}

  // kalau pakai inject
  // @Inject()
  // private service: UserService;

  @Get('/connection')
  async getConnetion(): Promise<string> {
    this.mailService.send();
    this.userRepository.save();
    this.emailService.send();
    console.info(this.memberService.getConnectionName());
    this.memberService.sendEmail();
    return this.connection.getName();
  }

  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template engine',
      name: name,
    });
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success Set Cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return request.cookies['name'];
  }

  @Post()
  post(): string {
    return 'POST';
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'Hello JSON',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-respose',
      statusCode: 301,
    };
  }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `Get ${id}`;
  }

  @Get('/sample')
  get(): string {
    return 'GET';
  }
}
