import { ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ItemEntity } from "./item.entity";

@Entity()
export class ServiceEntity {

    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(() => ItemEntity)
    item: ItemEntity;
    
}