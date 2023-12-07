import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaxEntity } from "./entities/tax.entity";
import { TaxController } from "./controllers/tax.controller";
import { TaxService } from "./services/tax.service";

@Module({
    imports: [TypeOrmModule.forFeature([TaxEntity])],
    controllers: [TaxController],
    providers:[TaxService]
})
export class TaxModule {}