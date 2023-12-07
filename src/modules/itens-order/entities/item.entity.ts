import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    code:number;

    @Column({ length:120 })
    name:string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unitPrice:number;
    
}