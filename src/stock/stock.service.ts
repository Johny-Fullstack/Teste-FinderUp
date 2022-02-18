import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationMeta, IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { StockAction } from 'src/_utils/enum/stock-action.enum';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepo: Repository<Stock>
  ) { }

  private async createStock(createStockDto: CreateStockDto, action: StockAction, ref: number): Promise<Stock> {
    const newStock = this.stockRepo.create({ ...createStockDto, action, ref: 0 });
    return await this.stockRepo.save(newStock);
  }

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const isExists = await this.find(createStockDto.name, null);
    if (isExists.length) {
      throw new BadRequestException('Material already registered')
    }

    return await this.createStock(createStockDto, StockAction.DEPOSIT, 0);
  }

  async findAllWithPagination(
    options: IPaginationOptions,
  ): Promise<Pagination<Stock, IPaginationMeta>> {
    const queryBuilder = this.stockRepo
      .createQueryBuilder('stock')

    queryBuilder.select([
      'stock.id',
      'stock.name',
      'stock.user',
      'stock.action',
      'stock.createdAt',
      'stock.updatedAt'
    ])

    queryBuilder.orderBy('stock.id', 'ASC')

    return await paginate<Stock>(queryBuilder, options)
  }

  async find(name?: string, user?: string): Promise<Stock[]> {
    let query = { name, user }

    if (!name) {
      delete query.name
    }

    if (!user) {
      delete query.user
    }

    const stock = await this.stockRepo.find({ where: { ...query }, })

    if (!stock) {
      throw new NotFoundException(`raw material name ${name} not found`)
    }

    return stock;
  }

  async findOne(id: number): Promise<Stock> {
    const isExists = await this.stockRepo.findOne(id)

    if (!isExists) {
      throw new NotFoundException(`raw material ID ${id} not found`)
    }

    return isExists;
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    const isExists = await this.findOne(id);
    if (isExists.quantity < updateStockDto.quantity) {
      throw new BadRequestException('Quantity of material unavailable')
    }

    const newQuantity = isExists.quantity - updateStockDto.quantity
    await this.stockRepo.update(id, {
      quantity: newQuantity
    })

    const { quantity, user } = await this.createStock(
      {
        name: isExists.name,
        quantity: updateStockDto.quantity,
        user: updateStockDto.user
      },
      StockAction.REQUEST,
      isExists.id
    )

    return { quantity, user };
  }
}
