import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { OderController } from "./controllers/order.controller";
import { OrderService } from "./services/order.service";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity])],
    controllers: [OderController],
    providers:[OrderService]
})
export class OrderModule {}