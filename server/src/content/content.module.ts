import { forwardRef, Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { BoardService } from 'src/board/board.service';
import { BoardRepository } from 'src/board/board.repository';
import { UserService } from 'src/auth/user.service';
import { UserRepository } from 'src/auth/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { Content } from './entity/content.entity';
import { BoardModule } from 'src/board/board.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentRepository]),
    AuthModule,
    BoardModule,
  ],
  controllers: [ContentController],
  providers: [ContentService],

  //이거
  exports: [ContentService],
})
export class ContentModule {}
