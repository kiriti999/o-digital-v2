import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

//RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  headers: true,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(limiter);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  app.setGlobalPrefix('/v1');
  await app.listen(5000);
}
bootstrap();
