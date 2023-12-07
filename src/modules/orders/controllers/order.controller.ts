import { Controller, Post, Put, Get, Body, Param } from "@nestjs/common";
import { OrderService } from "../services/order.service";
import { CreateOrderDto } from "../dto/create-order.dto";
import { OrderEntity } from "../entities/order.entity";
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('/orders')
export class OderController {

    constructor(private readonly service: OrderService) {}
    
    @ApiOperation({ summary: 'Cria novo Pedido' })
    @ApiResponse({ status: 200, description: 'Retorna 200 e o objeto criado' })
    @Post()
    public async create(@Body() createDto: CreateOrderDto): Promise<{ data: OrderEntity }> {
        const objectCreated = await this.service.create(createDto)
        return  { data: objectCreated}
    }

    @ApiOperation({ summary: 'Recupera todos os pedidos cadastrados' })
    @ApiResponse({ status: 200, description: 'Retorna 200 caso haja sucesso' })
    @Get()
    public async getAll(): Promise<{ data: OrderEntity[]}> {
        const list = await this.service.listAll()
        return { data: list };
    }

    @ApiOperation({ summary: 'Recupera um pedido específico pelo seu ID' })
    @ApiResponse({ status: 200, description: 'Retorna 200 caso haja sucesso' })
    @Get(':id')
    public async getOne(@Param('id') id:number): Promise<{data: OrderEntity }> {
        const listOne = await this.service.listOne(id)
        return { data: listOne };
    }

    // @ApiOperation({ summary: 'Adiciona itens ao pedido' })
    // @ApiResponse({ status: 200, description: 'Retorna 200 caso haja sucesso' })
    // @Put('/:id/items')
    // public addItem(): any {
    //     return { data: 'Add item in order' };
    // }

}