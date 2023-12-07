import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServiceEntity } from "../entities/service.entity";
import { CreateItemDto } from "../dto/create-item.dto";
import { Constants } from "../constants";
import { TaxEntity } from "src/modules/taxes/entities/tax.entity";
import { OrderEntity } from "src/modules/orders/entities/order.entity";
import { AddItemIntoOrderDto } from "../dto/add-item-into-order.dto";
import { ItemOrderEntity } from "../entities/item.order.entity";
import { ItemInterface } from "../interfaces/item.interface";

@Injectable()
export class ServiceService implements ItemInterface{

  constructor(
    @InjectRepository(ServiceEntity)
    private repository: Repository<ServiceEntity>,
    @InjectRepository(OrderEntity)
    private repositoryOrder: Repository<OrderEntity>,
    @InjectRepository(OrderEntity)
    private repositoryTax: Repository<TaxEntity>,
  ) {}

  async listOne(id:number) {
    return this.repository.findOne({
      where: { id }
    })
  }

  async listAll() {
    return this.repository.find()
  }

  async create(createDto: CreateItemDto) {
    const entity = this.createFromDto(createDto);
    return this.repository.save(entity)
  }

  private createFromDto(createDto: CreateItemDto): ServiceEntity {
    
    const entity = new ServiceEntity();

    entity.item.code = createDto.code;
    entity.item.name = createDto.name;

    return entity;
  }


  async addIntoOrder(dto: AddItemIntoOrderDto) {
    const entity = await this.addIntoOrderByDto(dto);
    return  this.repository.save(entity)
  }

  private async addIntoOrderByDto(dto: AddItemIntoOrderDto): Promise<ItemOrderEntity> {
    
    // TODO: Adicionar logica para verificar se este item a ser adicionado ja nao 
    //       foi adicionado neste pedido e refazer os calculos de quantidade e de valor total

    const entity = new ItemOrderEntity();

    const product = await this.repository.findOne({
      where : {id: dto.item_id}
    });

    if (!product) {
      throw new Error(`Product with ID ${dto.item_id} not found`);
    }

    const order = await this.repositoryOrder.findOne({
      where : {id: dto.order_id}
    });

    if (!order) {
      throw new Error(`Order with ID ${dto.item_id} not found`);
    }

    // TODO: Validar tipo do item

    entity.order = order
    entity.item = product.item
    entity.type = Constants.TYPE_ITEM.SERVICE
    entity.quantity = dto.quantity
    entity.unitPrice = product.item.unitPrice
    entity.totalPrice = (entity.unitPrice * entity.quantity)

    entity.totalPriceWithTax = await this.calculateTotalWithTax(entity.totalPrice, entity.type)

    order.totalOrder = entity.totalPriceWithTax
    this.repositoryOrder.save(order)
    this.repository.save(entity)

    return entity;
  }

  async calculateTotalWithTax(totalPrice: number, type:string): Promise<number> {
    
    const tax = await this.repositoryTax.findOne({
      where : {type: type}
    });

    if (!tax) {
      throw new Error(`Tax with type ${type} not found`);
    }

    const taxAmount = (tax.percentual / 100) * totalPrice;
    const totalWithTax = totalPrice + taxAmount;

    return totalWithTax;

  }

}