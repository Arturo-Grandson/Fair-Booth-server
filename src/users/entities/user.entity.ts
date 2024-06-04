import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { BoothEntity } from '../../booth/entities/booth.entity';
import { ComsuptionsEntity } from '../../comsuptions/entities/comsuptions.entity';
import { IsEmail, IsString, MinLength } from 'class-validator';

export interface IUserEntity {
  id: number;
  uuid: string;
  name: string;
  email: string;
  phone: string;
  pass: string;
}

@Entity({ name: 'users' })
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid' })
  @Generated('uuid')
  uuid: string;

  @IsString()
  @Column({ name: 'name' })
  name: string;

  @IsString()
  @IsEmail()
  @Column({ name: 'email', unique: true })
  email: string;

  @IsString()
  @Column({ name: 'phone', unique: true })
  phone: string;

  @IsString()
  @MinLength(8)
  @Column({ name: 'pass', select: false })
  pass: string;

  @ManyToMany(() => BoothEntity, (booth) => booth.users)
  booths: BoothEntity[];

  @OneToMany(() => ComsuptionsEntity, (comsuption) => comsuption.user)
  comsuptions: ComsuptionsEntity[];
}
