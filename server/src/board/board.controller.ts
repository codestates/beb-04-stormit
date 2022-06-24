import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardsService: BoardService) {}
  private logger = new Logger('BoardController');

  // 모든 게시판 가져오기
  @Get('/')
  getAllBoards(): Promise<Board[]> {
    this.logger.verbose(`User ### trying to get all contents `);
    return this.boardsService.getAllBoards();
  }

  // 게시판 하나에 대한 게시글 가져오기
  @Get('/:id')
  getBoardById(@Param('id') id: string): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // 게시판 생성
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    this.logger.log(
      `User $$$ creating a new board \nPayload: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return this.boardsService.createBoard(createBoardDto);
  }
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id) {
    return this.boardsService.deleteBoard(id);
  }
}