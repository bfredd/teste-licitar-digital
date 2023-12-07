import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaxEntity } from "../entities/tax.entity";
import { CreateTaxDto } from "../dto/create-tax.dto";

@Injectable()
export class TaxService {

  constructor(
    @InjectRepository(TaxEntity)
    private repository: Repository<TaxEntity>,
  ) {}

  async listOne(id:number) {
    return this.repository.findOne({
      where: { id }
    })
  }

  async listAll() {
    return this.repository.find()
  }

  async create(createDto: CreateTaxDto) {
    const entity = this.createFromDto(createDto);
    return this.repository.save(entity)
  }

  private createFromDto(createDto: CreateTaxDto): TaxEntity {
    
    const entity = new TaxEntity();

    entity.code = createDto.code;
    entity.percentual = createDto.percentual;
    entity.type = createDto.type;

    return entity;
  }

}