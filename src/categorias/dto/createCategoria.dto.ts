import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ValidationMessagesHelper } from '../../common/helpers/validationMessages.helper';

export class CreateCategoriaDto {
  @IsString({ message: ValidationMessagesHelper.invalidMessage('nome') })
  @IsNotEmpty({ message: ValidationMessagesHelper.requiredMessage('nome') })
  @MaxLength(255, {
    message: ValidationMessagesHelper.maxLengthMessage('nome', 255),
  })
  nome!: string;

  @IsString({ message: ValidationMessagesHelper.invalidMessage('descricao') })
  @IsNotEmpty({
    message: ValidationMessagesHelper.requiredMessage('descricao'),
  })
  @MaxLength(400, {
    message: ValidationMessagesHelper.maxLengthMessage('descricao', 400),
  })
  descricao!: string;
}
    