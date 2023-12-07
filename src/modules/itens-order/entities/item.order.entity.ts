import { Column, ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ItemEntity } from "./item.entity";
import { OrderEntity } from "src/modules/orders/entities/order.entity";

@Entity()
export class ItemOrderEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length:120 })
    type:string;

    @Column()
    quantity:number;

    @ManyToOne(() => OrderEntity)
    order: OrderEntity;
    
    @ManyToOne(() => ItemEntity)
    item: ItemEntity;

    @Column()
    unitPrice:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPriceWithTax:number;
    
}