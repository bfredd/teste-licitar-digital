import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { ItemEntity } from "./entities/item.entity";
import { AllocationEntity } from "./entities/allocation.entity";
import { ServiceEntity } from "./entities/service.entity";
import { ProductController } from "./controllers/product.controller";
import { AllocationController } from "./controllers/allocation.controller";
import { ServiceController } from "./controllers/service.controller";
import { ProductService } from "./services/produto.service";
import { AllocationService } from "./services/allocation.service";
import { ServiceService } from "./services/service.service";
import { OrderService } from "../orders/services/order.service";
import { ItemOrderEntity } from "./entities/item.order.entity";
import { OrderEntity } from "../orders/entities/order.entity";
import { ConstantsModule } from "./constants";

@Module({
    imports: [TypeOrmModule.forFeature([ItemEntity, ProductEntity, AllocationEntity, ServiceEntity, ItemOrderEntity, OrderEntity, ItemOrderEntity]), ConstantsModule],
    controllers: [ProductController, AllocationController, ServiceController],
    providers:[ProductService, AllocationService, ServiceService, OrderService]
})
export class ItensOrderModule {}