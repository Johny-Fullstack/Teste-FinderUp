import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Stock } from './entities/stock.entity';

@ApiTags('Raw Materials')
@Controller('rawMaterials')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'user', required: false, type: String })
  async findWithName(@Query('name') name: string, @Query('user') user: string): Promise<Stock[]> {

    return await this.stockService.find(name, user);
  }

  @Get("/all")
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAllWithPagination(@Query('page') page = 1, @Query('limit') limit = 50) {
    limit = limit > 100 ? 100 : limit;

    return this.stockService.findAllWithPagination({ page, limit });
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id/request')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

}
