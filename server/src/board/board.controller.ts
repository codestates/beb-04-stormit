import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { deletePostDto } from './dto/delete-post.dto';
import { editPostDto } from './dto/edit-post.dto';
import { WriteBoardDto } from './dto/write-board.dto';

@Controller('board')
export class BoardController {
  @Post('write-content')
  writeboard(@Body() dto: WriteBoardDto) {
    console.log(dto);
  }
  @Put('modify-content')
  editPost(@Body() dto: editPostDto) {
    console.log(dto);
  }
  @Delete('delete-content')
  deletePost(@Body() dto: deletePostDto) {
    console.log(dto);
  }
}
