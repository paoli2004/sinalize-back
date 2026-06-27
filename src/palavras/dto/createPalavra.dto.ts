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
