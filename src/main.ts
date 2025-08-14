import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import mustacheExpress from 'mustache-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser('RAHASIA'))
  app.set('views', __dirname + '/../views')
  app.set('view engine', 'html')
  app.engine('html', mustacheExpress())
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
