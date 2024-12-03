import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const formattedErrors = {};
        errors.forEach((err) => {
          formattedErrors[err.property] = {
            message: err.constraints[Object.keys(err.constraints)[0]],
          };
        });
        return new BadRequestException(formattedErrors);
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: process.env.CLIENT_URL,
    methods: '*',
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  await app.listen(5004, '0.0.0.0');
}
bootstrap();
