import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { BoothEntity } from 'src/booth/entities/booth.entity';


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

  @Column({name: 'year'})
  dateComsuption: number;

  @ManyToOne(() => UserEntity, user => user.comsuptions)
  user: UserEntity;

  @ManyToOne(() => BoothEntity, booth => booth.comsuptions)
  booth: BoothEntity;

  @OneToOne(() => ProductsEntity, product => product.comsuptions)
  @JoinColumn({name: 'product_id'})
  product: ProductsEntity

}