import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TranslationModule } from './modules/translation/translation.module';
import { AcademicContentModule } from './modules/academic-content/academic-content.module';

@Module({
  imports: [
    // Global environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate-limiting / anti-abuse shield
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 60, // 60 requests per minute per IP
      },
    ]),

    // AI Cognitive Sub-Modules
    TranslationModule,
    AcademicContentModule,
  ],
})
export class AppModule {}
