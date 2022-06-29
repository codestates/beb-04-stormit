import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/auth/entity/user.entity';
import { Board } from 'src/board/entity/board.entity';
import { IsEmail, IsNumber } from 'class-validator';
import { Comment } from 'src/comment/entity/comment.entity';
//CREATE TABLE content{}
@Entity() //
export class Content extends BaseEntity {
  @PrimaryGeneratedColumn() // 기본 key 열임을 나타낸다.
  id: number;

  @ManyToOne(() => Board, (board) => board.contents, { eager: true })
  board: Board;

  @ManyToOne(() => User, (user) => user.user_id, { eager: true })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.content, { eager: true })
  comments: Comment[];

  @IsEmail({ nullable: true })
  nickname: string;

  @Column()
  recommendations: number;

  @Column({ nullable: true })
  post_title: string;

  @Column({ nullable: true })
  post_content: string;

  @CreateDateColumn()
  created_at: Date;
}
