import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v0')
  app.enableCors()
  
  //app.use('/profileimg', express.static('../assets/images/'))
  await app.listen(process.env.PORT);
}
bootstrap();
