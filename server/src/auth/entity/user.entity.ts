import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    nickname?: string;
}