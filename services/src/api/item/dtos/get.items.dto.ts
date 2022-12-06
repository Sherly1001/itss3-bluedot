import { ApiProperty } from '@nestjs/swagger';

export class GetItemsDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  categories?: string[];

  @ApiProperty({ required: false })
  shops?: string[];
}
