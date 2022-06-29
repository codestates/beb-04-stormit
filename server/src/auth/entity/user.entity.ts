import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Content } from 'src/content/entity/content.entity';
import { Comment } from 'src/comment/entity/comment.entity';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @OneToMany(() => Content, (content) => content.user)
  contents: Content[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
  @Column()
  password: string;

  @Column()
  nickname?: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  hashedRt?: string;

  @Column({ nullable: true })
  thirdPartyId?: string;

  @Column({ nullable: true })
  thirdPartyToken?: string;

  @Column({ nullable: true })
  signupVerifyToken?: string;
}
