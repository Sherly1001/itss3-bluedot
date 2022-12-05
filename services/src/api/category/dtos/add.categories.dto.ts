import { ApiProperty } from '@nestjs/swagger';

export class AddCategoriesDto {
  @ApiProperty()
  names: string[];
}
