import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
