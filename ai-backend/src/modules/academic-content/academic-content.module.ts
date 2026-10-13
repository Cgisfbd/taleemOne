import { Module } from '@nestjs/common';
import { AcademicContentService } from './academic-content.service';
import { AcademicContentController } from './academic-content.controller';

@Module({
  controllers: [AcademicContentController],
  providers: [AcademicContentService],
  exports: [AcademicContentService],
})
export class AcademicContentModule {}
