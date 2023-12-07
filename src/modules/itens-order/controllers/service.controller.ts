import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateItemDto } from "../dto/create-item.dto";
import { ServiceService } from "../services/service.service";
import { ServiceEntity } from "../entities/service.entity";

@ApiTags('Serviços')
@Controller('/services')
export class ServiceController {

    constructor(private readonly service: ServiceService) {}
    
    @ApiOperation({ summary: 'Cria novo Produto' })
    @ApiResponse({ status: 200, description: 'Retorna 200 e o objeto criado' })
    @Post()
    public async create(@Body() createDto: CreateItemDto): Promise<{ data: ServiceEntity }> {
        const objectCreated = await this.service.create(createDto)
        return  { data: objectCreated}
    }

    @ApiOperation({ summary: 'Recupera todos os produtos cadastrados' })
    @ApiResponse({ status: 200, description: 'Retorna 200 caso haja sucesso' })
    @Get()
    public async getAll(): Promise<{ data: ServiceEntity[]}> {
        const list = await this.service.listAll()
        return { data: list };
    }

    @ApiOperation({ summary: 'Recupera um produto específico pelo seu ID' })
    @ApiResponse({ status: 200, description: 'Retorna 200 caso haja sucesso' })
    @Get(':id')
    public async getOne(@Param('id') id:number): Promise<{data: ServiceEntity }> {
        const listOne = await this.service.listOne(id)
        return { data: listOne };
    }

}