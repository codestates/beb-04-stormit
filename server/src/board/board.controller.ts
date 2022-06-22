import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';
import { UpdateDataDto } from './dto/updateData.dto';

@Controller('board')
export class BoardController {
  constructor(private boardsService: BoardService) {}
  private logger = new Logger('BoardController');
  @Get()
  getAllBoard(): Promise<Board[]> {
    this.logger.verbose(`User ### trying to get all boards `);
    return this.boardsService.getAllBoards();
  }
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  cretaeBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    this.logger.verbose(
      `User $$$ creating a new board. \nPayload: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  // put, patch차이
  // put은 일부분만 수정 후 받지 않은 값에 대해서는 null
  // patch는 일부분만 수정한 경우 일부부만 수정되어 전달한다.
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  path(@Param('id') id: number, @Body() updateDataDto: UpdateDataDto) {
    return this.boardsService.updateBoard(id, updateDataDto);
  }
  //ParseIntpipe는 숫자로 잘 오는지 체크한다.
}
