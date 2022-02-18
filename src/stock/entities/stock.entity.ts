import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { StockAction } from 'src/_utils/enum/stock-action.enum';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  user: string;

  @Column()
  @Index()
  name: string;

  @Column()
  @Index()
  action: StockAction

  @Column()
  quantity: number

  @Column({ select: false })
  ref: number

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
