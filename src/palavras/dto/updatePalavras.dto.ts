import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePalavrasDto } from './createPalavras.dto';

export class UpdatePalavrasDto extends PartialType(
  PickType(CreatePalavrasDto, ['palavra', 'descricao'] as const),
) {}
