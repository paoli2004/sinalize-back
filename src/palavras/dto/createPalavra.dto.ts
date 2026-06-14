import {
  IsArray,
  IsInt,
  isNotEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ValidationMessagesHelper } from '../../common/helpers/validationMessages.helper';

export class CreatePalavraDto {
  @IsString({ message: ValidationMessagesHelper.invalidMessage('palavra') })
  @IsNotEmpty({ message: ValidationMessagesHelper.requiredMessage('palavra') })
  @MaxLength(255, {
    message: ValidationMessagesHelper.maxLengthMessage('palavra', 255),
  })
  palavra!: string;

  @IsString({ message: ValidationMessagesHelper.invalidMessage('descrição') })
  @IsNotEmpty({
    message: ValidationMessagesHelper.requiredMessage('descrição'),
  })
  @MaxLength(400, {
    message: ValidationMessagesHelper.maxLengthMessage('descrição', 400),
  })
  descricao!: string;

  @IsArray({
    message: ValidationMessagesHelper.invalidFormatMessage('categoryIds'),
  })
  @IsInt({
    each: true,
    message: ValidationMessagesHelper.isNotIntegerMessage('categoryIds'),
  })
  @IsNotEmpty({
    message: ValidationMessagesHelper.isNotAssociateToCategoryMessage(),
  })
  categoryIds!: number[];
}
