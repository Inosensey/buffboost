import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { PrismaExceptionFilter } from './PrismaExceptionFilter';
import { HttpExceptionFilter } from './HttpExceptionFilter';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { json } from 'express';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter(), new HttpExceptionFilter());
  app.use(json({ limit: '10mb' }));
  app.use(cookieParser());
  app.use(
    '/stripe/webhook',
    bodyParser.raw({
      type: 'application/json',
      verify: (req: any, res, buf) => {
        req.rawBody = buf;
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
