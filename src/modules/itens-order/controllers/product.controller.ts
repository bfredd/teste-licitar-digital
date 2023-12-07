import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ProductService } from "../services/produto.service";
import { CreateItemDto } from "../dto/create-item.dto";
import { ProductEntity } from "../entities/product.entity";
import { AddItemIntoOrderDto } from "../dto/add-item-into-order.dto";

@ApiTags('Produtos')
@Controller('/products')
export class ProductController {

    constructor(private readonly service: ProductService) {}
    
    @ApiOperation({ summary: 'Cria novo Produto' })
    @ApiResponse({ status: 200, description: 'Retorna 200 e o objeto criado' })
    @Post()
    public async create(@Body() createDto: CreateItemDto): Promise<{ data: ProductEntity }> {
        const objectCreated = await this.service.create(createDto)
        return  { data: objectCreated}
    }

    @ApiOperation({ summary: 'Recupera todos os produtos cadastrados' })
    @ApiResponse({ status: 200, description: 'Retorna 200 caso haja sucesso' })
    @Get()
    public async getAll(): Promise<{ data: ProductEntity[]}> {
        const list = await this.service.listAll()
        return { data: list };
    }

    @ApiOperation({ summary: 'Recupera um produto específico pelo seu ID' })
    @ApiResponse({ status: 200, description: 'Retorna 200 caso haja sucesso' })
    @Get(':id')
    public async getOne(@Param('id') id:number): Promise<{data: ProductEntity }> {
        const listOne = await this.service.listOne(id)
        return { data: listOne };
    }

    @ApiOperation({ summary: 'Adiciona um Produto com item de um Pedido' })
    @ApiResponse({ status: 200, description: 'Retorna 200 caso o produto seja adicionado no pedido' })
    @Post()
    public async addIntoOrder(@Body() addDto: AddItemIntoOrderDto): Promise<{ data: ProductEntity }> {
        const objectAdded = await this.service.addIntoOrder(addDto)
        return  { data: objectAdded}
    }

}