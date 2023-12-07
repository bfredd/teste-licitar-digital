import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaxEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    type:string;

    @Column()
    code:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    percentual:number;
    
}