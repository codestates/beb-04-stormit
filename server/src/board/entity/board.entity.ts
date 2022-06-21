import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//CREATE TABLE board{}
@Entity() // BoardEntity가 board 엔티티임을 나타낸다.
export class Board {
  @PrimaryGeneratedColumn() // 기본 key 열임을 나타낸다.
  id: number;

  @Column() // title 및 description과 같은 다른 열을 나타낼 때 사용한다.
  title: string;

  @Column()
  content: string;
}

// @Entity('content')
// export class ContentEntity {
//   @PrimaryGeneratedColumn()
//   content_id: number;

//   @Column({})
//   content: string;

//   @Column({})
//   create_at: Timestamp;
//   @Column({})
//   writer: string;
// }
