import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './createCategoria.dto';

export class UpdateCategoriaDto extends PartialType(
  PickType(CreateCategoriaDto, ['nome', 'descricao'] as const),
) {}
