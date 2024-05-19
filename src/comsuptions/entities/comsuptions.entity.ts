import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { BoothEntity } from 'src/booth/entities/booth.entity';
import { IsIn } from 'class-validator';

export interface IComsuption {
  id: number;
  uuid: string;
  year: number;

}

@Entity({ name: 'comsuptions' })
export class ComsuptionsEntity implements IComsuption {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid' })
  @Generated('uuid')
  uuid: string;

  @Column({ name: 'year' })
  year: number;

  @IsIn(['sanjuan', 'feria'])
  @Column({name: 'celebration'})
  celebrationType: string;

  @ManyToOne(() => UserEntity, (user) => user.comsuptions)
  user: Promise<UserEntity>;

  @ManyToOne(() => BoothEntity, (booth) => booth.comsuptions)
  booth: Promise<BoothEntity>;

  @ManyToOne(() => ProductsEntity, (product) => product.comsuptions)
  @JoinColumn({ name: 'product_id' })
  product: Promise<ProductsEntity>;
}
