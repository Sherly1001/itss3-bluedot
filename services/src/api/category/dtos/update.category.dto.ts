import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Category } from 'src/domain/schemas/category.schema';

export class UpdateCategoryDto extends PartialType(Category) {}
