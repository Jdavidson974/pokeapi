import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BusinessPlan {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    price: number;
}
