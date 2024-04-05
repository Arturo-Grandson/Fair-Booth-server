import { IsIn } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Generated, OneToOne } from 'typeorm';
import { ComsuptionsEntity } from './comsuption.entity';

export interface IProductsEntity {
  id: number;
  uuid: string;
  name: string;
  type: string;
  price: number;
}

@Entity({name: 'products'})
export class ProductsEntity implements IProductsEntity {

  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'uuid'})
  @Generated('uuid')
  uuid: string;

  @Column({name: 'name'})
  name: string;

  @IsIn(['food', 'drink'])
  @Column({name: 'type'})
  type: string;

  @Column('decimal', {precision: 5, scale: 2, name: 'price'})
  price: number;

  @OneToOne(() => ComsuptionsEntity, comsuption => comsuption.product)
  comsuptions: ComsuptionsEntity;
}