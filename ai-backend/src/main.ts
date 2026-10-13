import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('TaleemOne-AI-Backend');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5001;
  const rawOrigins =
    configService.get<string>('ALLOWED_ORIGINS') || 'http://localhost:3000';
  const allowedOrigins = rawOrigins.split(',').map((o) => o.trim());

  // 1. Helmet Security Armor
  app.use(helmet());

  // 2. CORS Lockdown
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      const isDev =
        (configService.get<string>('NODE_ENV') || 'development') !==
        'production';
      const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(
        origin,
      );

      if (
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*') ||
        (isDev && isLocalhost)
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-AI-Secret-Key',
      'X-App-Secret',
    ],
  });

  // 3. Start Microservice on Port 5001
  await app.listen(port, '0.0.0.0');

  const fallbackChain =
    configService.get<string>('AI_FALLBACK_CHAIN') ||
    'groq,openrouter,gemini,openai';

  logger.log(`========================================================`);
  logger.log(`🚀 TaleemOne AI Cognitive Backend is RUNNING on Port: ${port}`);
  logger.log(`🛡️ Handshake Armor: ACTIVE`);
  logger.log(`🔄 Failover Cascade: ${fallbackChain.toUpperCase()}`);
  logger.log(`🌐 Allowed Origins: ${allowedOrigins.join(', ')}`);
  logger.log(`========================================================`);
}

bootstrap();
