import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";
import { BoothEntity } from "src/booth/entities/booth.entity";
import { ProductsEntity } from "src/products/entities/products.entity";
import { UserEntity } from "src/auth/entities/user.entity";


export class AddComsuptionDto {
  @ApiProperty({required: false})
  year: number = null as unknown as number;

  @ApiProperty({required: false})
  // user: UserEntity = null as unknown as UserEntity;
  user: number = null as unknown as number

  @ApiProperty({required: false})
  // booth: BoothEntity = null as unknown as BoothEntity
  booth: number = null as unknown as number

  @ApiProperty({required: false})
  // product: ProductsEntity = null as unknown as ProductsEntity
  product: number = null as unknown as number

  @ApiProperty({required: false})
  @IsNotEmpty()
  @IsIn(['sanjuan', 'feria'])
  celebrationType: string = null as unknown as string
}