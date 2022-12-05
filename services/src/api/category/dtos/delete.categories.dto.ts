import { ApiProperty } from '@nestjs/swagger';

export class DeleteCategoriesDto {
  @ApiProperty()
  ids: string[];
}
