import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main-gateway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = Envs.PORT ?? 3000;
  await app.listen(port, () => {
    logger.log(`Server running on port ${port}`);
  });
}
bootstrap();
