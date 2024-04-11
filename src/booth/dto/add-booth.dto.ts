import { ApiProperty } from "@nestjs/swagger";

export class AddBoothDto {

  @ApiProperty({required: false})
  name: string = null as unknown as string;

}