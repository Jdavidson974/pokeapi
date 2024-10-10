import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Autorise toutes les origines
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: false, // Mettre à false si tu n'utilises pas de cookies ou d'authentification basée sur les sessions
  });
  // Middleware pour gérer les requêtes OPTIONS globalement
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      const expressRes = res as unknown as import('express').Response; // Cast explicite en Response d'Express
      expressRes.setHeader('Access-Control-Allow-Origin', '*');
      expressRes.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      expressRes.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return expressRes.sendStatus(200);
    }
    next();
  });


  await app.listen(3000);
}
bootstrap();
