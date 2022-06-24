import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {Exclude} from 'class-transformer'
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

    @Column({nullable:true})
    @Exclude({ toPlainOnly: true })
    hashedRt?: string;
}