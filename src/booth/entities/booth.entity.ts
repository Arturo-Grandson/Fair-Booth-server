import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ComsuptionsEntity } from 'src/comsuptions/entities/comsuptions.entity';

export interface IBooth {
  id: number;
  uuid: string;
  name: string;
  users: UserEntity[],
  comsuptions: ComsuptionsEntity[]
}

@Entity({name: 'booth'})
export class BoothEntity implements IBooth{

  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'uuid'})
  @Generated('uuid')
  uuid: string;

  @Column({name: 'name'})
  name: string;

  @ManyToMany(() => UserEntity, user => user.booths)
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => ComsuptionsEntity, comsuption => comsuption.booth)
  comsuptions: ComsuptionsEntity[]

}
