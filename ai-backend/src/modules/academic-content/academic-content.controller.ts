import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AcademicContentService } from './academic-content.service';
import { AiAuthGuard } from '@/common/guards/ai-auth.guard';
import {
  translateDescriptionSchema,
  TranslateDescriptionDto,
} from './dtos/translate-description.dto';

@Controller('api/ai')
@UseGuards(AiAuthGuard)
export class AcademicContentController {
  constructor(
    private readonly academicContentService: AcademicContentService,
  ) {}

  @Post('translate-description-urdu')
  @HttpCode(HttpStatus.OK)
  async translateDescriptionUrdu(@Body() body: TranslateDescriptionDto) {
    const parseResult = translateDescriptionSchema.safeParse(body);
    if (!parseResult.success) {
      const errorMsg =
        parseResult.error.errors[0]?.message || 'Invalid input payload';
      throw new BadRequestException(errorMsg);
    }

    const { text } = parseResult.data;
    const translation =
      await this.academicContentService.translateDescriptionToUrdu(text);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Urdu description translated successfully',
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

  @Post('translate-description-hindi')
  @HttpCode(HttpStatus.OK)
  async translateDescriptionHindi(@Body() body: TranslateDescriptionDto) {
    const parseResult = translateDescriptionSchema.safeParse(body);
    if (!parseResult.success) {
      const errorMsg =
        parseResult.error.errors[0]?.message || 'Invalid input payload';
      throw new BadRequestException(errorMsg);
    }

    const { text } = parseResult.data;
    const translation =
      await this.academicContentService.translateDescriptionToHindi(text);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Hindi description translated successfully',
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
