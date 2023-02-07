import { ApiProperty } from '@nestjs/swagger';
import { BasePagging } from 'src/domain/dtos/pagging';

export class GetItemsDto extends BasePagging {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  categories?: string[];

  @ApiProperty({ required: false })
  shops?: string[];
}
