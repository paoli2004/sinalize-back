import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePalavraDto } from './createPalavra.dto';

export class UpdatePalavraDto extends PartialType(
  PickType(CreatePalavraDto, ['palavra', 'categoryIds'] as const),
) {}
