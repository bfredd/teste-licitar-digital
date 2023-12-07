import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TaxService } from "../services/tax.service";
import { CreateTaxDto } from "../dto/create-tax.dto";
import { TaxEntity } from "../entities/tax.entity";

@ApiTags('Impostos')
@Controller('/taxes')
export class TaxController {

    constructor(private readonly service: TaxService) {}
    
    @ApiOperation({ summary: 'Cria novo Imposto' })
    @ApiResponse({ status: 200, description: 'Retorna 200 e o objeto criado' })
    @Post()
    public async create(@Body() createDto: CreateTaxDto): Promise<{ data: TaxEntity }> {
        const objectCreated = await this.service.create(createDto)
        return  { data: objectCreated}
    }

    @ApiOperation({ summary: 'Recupera todos os impostos cadastrados' })
    @ApiResponse({ status: 200, description: 'Retorna 200 caso haja sucesso' })
    @Get()
    public async getAll(): Promise<{ data: TaxEntity[]}> {
        const list = await this.service.listAll()
        return { data: list };
    }

    @ApiOperation({ summary: 'Recupera um imposto específico pelo seu ID' })
    @ApiResponse({ status: 200, description: 'Retorna 200 caso haja sucesso' })
    @Get(':id')
    public async getOne(@Param('id') id:number): Promise<{data: TaxEntity }> {
        const listOne = await this.service.listOne(id)
        return { data: listOne };
    }

}