import { type } from 'os';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  Unique,
} from 'typeorm';
import { Board } from './board.entity';

//CREATE TABLE content{}
@Entity() //
export class Content extends BaseEntity {
  @PrimaryGeneratedColumn() // 기본 key 열임을 나타낸다.
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Board, (board) => board.contents)
  board: Board;

  @Column()
  post_title: string;

  @Column()
  post_content: string;

  @CreateDateColumn()
  created_at: Date;
}
