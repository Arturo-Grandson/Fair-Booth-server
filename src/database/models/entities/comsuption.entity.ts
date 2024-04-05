import { IsInt, IsPositive } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne } from 'typeorm';
import { isInt } from 'validator';
import { UserEntity } from './user.entity';
import { BoothEntity } from './booth.entity';
import { ProductsEntity } from './products.entity';


export interface IComsuption {
  id: number;
  uuid: string;
  dateComsuption: number;
}

@Entity({name: 'comsuptions'})
export class ComsuptionsEntity implements IComsuption {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'uuid'})
  @Generated('uuid')
  uuid: string;

  @IsInt()
  @IsPositive()
  @Column({name: 'year'})
  dateComsuption: number;

  @ManyToOne(() => UserEntity, user => user.comsuptions)
  user: UserEntity;

  @ManyToOne(() => BoothEntity, booth => booth.comsuptions)
  booth: BoothEntity;

  @ManyToOne(() => ProductsEntity, product => product.comsuptions)
  product: ProductsEntity

}