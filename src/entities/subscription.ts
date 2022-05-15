import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn, Timestamp} from "typeorm";
import { User } from "./user"

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    endDate: Timestamp;

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}
