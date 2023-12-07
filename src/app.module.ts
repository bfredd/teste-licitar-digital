import { Module } from '@nestjs/common';
import { OrderModule } from './modules/orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItensOrderModule } from './modules/itens-order/itens-order.module';
import { TaxModule } from './modules/taxes/taxes.module';

@Module({
  imports: [OrderModule, ItensOrderModule, TaxModule, TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "mysql",
    "port": 3306,
    "username": "licitacao",
    "password": "123456",
    "database": "licitacao_digital",
    "synchronize": true,
    "logging": true,
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "migrations": ["dist/migrations/*{.ts.js}"]
  })],
})

export class AppModule {}