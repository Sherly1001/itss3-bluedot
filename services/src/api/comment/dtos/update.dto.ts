import { PartialType } from '@nestjs/swagger';
import { Comment } from 'src/domain/schemas';

export class UpdateComment extends PartialType(Comment) {}
