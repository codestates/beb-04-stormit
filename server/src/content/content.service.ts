import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user.service';
import { BoardService } from 'src/board/board.service';
import { CommentService } from 'src/comment/comment.service';
import { ContentRepository } from './content.repository';
import { CreateContentDto } from './dto/create-content.dto';
import { RecommendationsContentDto } from './dto/recommendations-content.dto';
import { UpdateDataDto } from './dto/updateData.dto';
import { Content } from './entity/content.entity';
@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentRepository)
    private contentRepository: ContentRepository,
  ) {}
  private logger = new Logger('ContentService');

  // 전체 글 가져오기
  async getAllContents(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  // 글 상세정보 가져오기
  getContentInfoById(id: number, userService: UserService): Promise<object> {
    return this.contentRepository.getContentInfoById(id, userService);
  }

  // 글 쓰기
  async createContent(
    createContentDto: CreateContentDto,
    userService: UserService,
    boardService: BoardService,
  ): Promise<object> {
    const { board_title } = createContentDto;
    let board_id = 0;
    if (board_title === 'bitcoin') {
      board_id = 1;
    } else if (board_title === 'ethereum') {
      board_id = 2;
    } else if (board_title === 'solana') {
      board_id = 3;
    } else {
      board_id = 0;
    }
    const foundBoard = await boardService.getBoardById(board_id);
    if (!foundBoard) {
      throw new BadRequestException(`The board could not be found.`);
    }
    return this.contentRepository.createContent(
      createContentDto,
      userService,
      foundBoard,
    );
  }

  // 글 삭제
  async deleteContent(id: number): Promise<object> {
    return this.contentRepository.deleteContent(id);
  }

  //글 수정
  async updateContent(
    id: number,
    updateDataDto: UpdateDataDto,
    boardService: BoardService,
  ): Promise<object> {
    const { board_title } = updateDataDto;
    let board_id = 1;
    if (board_title === 'ethereum') {
      board_id = 2;
    } else if (board_title === 'solana') {
      board_id = 3;
    } else {
      board_id = 0;
    }
    const found_board = await boardService.getBoardById(board_id);
    if (found_board) {
      return this.contentRepository.updateContent(id, updateDataDto);
    } else {
      throw new BadRequestException('Board not found.');
    }
  }
  getPostId(post_id: number): Promise<Content> {
    return this.contentRepository.getPostId(post_id);
  }

  getRecommendationsIncrease(id: number): Promise<object> {
    return this.contentRepository.getRecommendationsIncrease(id);
  }
  getRecommendationsDecrease(id: number): Promise<object> {
    return this.contentRepository.getRecommendationsDecrease(id);
  }

  // 조회수 증가
  getViews(id: number): Promise<object> {
    return this.contentRepository.getViews(id);
  }
}
