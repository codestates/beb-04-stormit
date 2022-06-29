import { User } from 'src/auth/entity/user.entity';
import { Content } from 'src/content/entity/content.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment_content: string;

  @CreateDateColumn()
  create_at: Date;

  @ManyToOne(() => Content, (content) => content.id)
  content: Content;

  @ManyToOne(() => User, (user) => user.user_id, { eager: true })
  user: User;
}
