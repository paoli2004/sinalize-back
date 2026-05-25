import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.PORT ?? 3000;
  const ambiente = process.env.NODE_ENV ?? 'não definido';

  await app.listen(port);

  Logger.log(`Aplicação rodando em modo: ${ambiente.toUpperCase()}`, 'Bootstrap');
  Logger.log(`Escutando na porta: ${port}`, 'Bootstrap');
}
bootstrap();
