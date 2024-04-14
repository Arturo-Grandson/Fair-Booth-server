import { Entity, Column, PrimaryGeneratedColumn, Generated, ManyToMany, OneToMany } from 'typeorm';
import { BoothEntity } from '../../booth/entities/booth.entity';
import { ComsuptionsEntity } from '../../comsuptions/entities/comsuptions.entity';

export interface IUserEntity{
  id: number;
  uuid: string;
  name: string;
  email: string;
  phone: string;
  pass: string;
}

@Entity({name: 'users'})
export class UserEntity implements IUserEntity {

  @PrimaryGeneratedColumn({name: 'id'})
  id: number

  @Column({name: 'uuid'})
  @Generated('uuid')
  uuid: string;
  
  @Column({name: 'name'})
  name: string;

  @Column({name: 'email', unique: true})
  email: string

  @Column({name: 'phone', unique: true})
  phone: string;

  @Column({name: 'pass'})
  pass: string;

  @ManyToMany(() => BoothEntity, booth => booth.users)
  booths: BoothEntity[];

  @OneToMany(() => ComsuptionsEntity, comsuption => comsuption.user)
  comsuptions: ComsuptionsEntity[];
}
