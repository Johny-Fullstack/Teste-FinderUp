import { Module } from '@nestjs/common';
import { StockModule } from './stock/stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db_config_env } from './_configs/env/db.config.env';

@Module({
  imports: [
    TypeOrmModule.forRoot(db_config_env[process.env.NODE_ENV || 'test']),
    StockModule,
  ],
})
export class AppModule { }
