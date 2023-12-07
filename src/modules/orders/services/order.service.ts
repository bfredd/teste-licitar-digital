import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "../entities/order.entity";
import { CreateOrderDto } from "../dto/create-order.dto";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
  ) {}

  async listOne(id:number) {
    return this.repository.findOne({
      where: { id }
    })
  }

  async listAll() {
    return this.repository.find()
  }

  async create(createDto: CreateOrderDto) {
    const entity = this.createFromDto(createDto);
    return this.repository.save(entity)
  }

  private createFromDto(createOrderDto: CreateOrderDto): OrderEntity {
    
    const entity = new OrderEntity();

    entity.code = createOrderDto.code;
    entity.name = createOrderDto.name;

    return entity;
  }

}