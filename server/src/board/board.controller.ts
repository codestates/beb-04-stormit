import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { deletePostDto } from './dto/delete-post.dto';
import { editPostDto } from './dto/edit-post.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';

@Controller('board')
export class BoardController {
  constructor(private boardsService: BoardService) {}
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  cretaeBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }
  // @Post('write-content')
  // writeboard(@Body() dto: WriteBoardDto) {
  //   console.log(dto);
  // }
  // @Put('modify-content')
  // editPost(@Body() dto: editPostDto) {
  //   console.log(dto);
  // }
  // @Delete('delete-content')
  // deletePost(@Body() dto: deletePostDto) {
  //   console.log(dto);
  // }
}
