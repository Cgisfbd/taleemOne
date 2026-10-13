import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { TranslationService } from './translation.service';
import { AiAuthGuard } from '@/common/guards/ai-auth.guard';
import { fixUrduSchema, FixUrduDto } from './dtos/fix-urdu.dto';
import { fixHindiSchema, FixHindiDto } from './dtos/fix-hindi.dto';

@Controller('api/ai')
@UseGuards(AiAuthGuard)
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post('fix-urdu')
  @HttpCode(HttpStatus.OK)
  async fixUrdu(@Body() body: FixUrduDto) {
    const parseResult = fixUrduSchema.safeParse(body);
    if (!parseResult.success) {
      const errorMsg =
        parseResult.error.errors[0]?.message || 'Invalid input payload';
      throw new BadRequestException(errorMsg);
    }

    const { text } = parseResult.data;
    const translation = await this.translationService.translateToUrdu(text);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Urdu script generated successfully',
      result: translation.result,
      data: {
        originalText: text,
        result: translation.result,
        provider: translation.provider,
        model: translation.model,
        durationMs: translation.durationMs,
      },
    };
  }

  @Post('fix-hindi')
  @HttpCode(HttpStatus.OK)
  async fixHindi(@Body() body: FixHindiDto) {
    const parseResult = fixHindiSchema.safeParse(body);
    if (!parseResult.success) {
      const errorMsg =
        parseResult.error.errors[0]?.message || 'Invalid input payload';
      throw new BadRequestException(errorMsg);
    }

    const { text } = parseResult.data;
    const translation = await this.translationService.translateToHindi(text);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Hindi script generated successfully',
      result: translation.result,
      data: {
        originalText: text,
        result: translation.result,
        provider: translation.provider,
        model: translation.model,
        durationMs: translation.durationMs,
      },
    };
  }
}
