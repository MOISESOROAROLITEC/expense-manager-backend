import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
var cors = require('cors')


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions:{
      enableImplicitConversion:true,
    },
  }));
  app.useGlobalGuards()
  app.use(cors())
  await app.listen(3000);
}
bootstrap();
