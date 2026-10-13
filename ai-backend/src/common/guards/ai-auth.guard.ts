import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const clientSecret =
      request.headers['x-ai-secret-key'] || request.headers['x-app-secret'];

    const expectedSecret = this.configService.get<string>(
      'AI_SERVICE_SECRET_KEY',
    );

    // If expected secret is configured, strictly enforce matching header
    if (expectedSecret && expectedSecret.trim() !== '') {
      if (!clientSecret || clientSecret !== expectedSecret) {
        throw new UnauthorizedException(
          'Unauthorized: Invalid or missing X-AI-Secret-Key handshake header.',
        );
      }
    }

    return true;
  }
}
