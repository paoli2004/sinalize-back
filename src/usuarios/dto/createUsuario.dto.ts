import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidationMessagesHelper } from '../../common/helpers/validationMessages.helper';

export class CreateUsuarioDto {
  @IsString({ message: ValidationMessagesHelper.invalidMessage('nome') })
  @IsNotEmpty({ message: ValidationMessagesHelper.requiredMessage('nome') })
  @MaxLength(255, {
    message: ValidationMessagesHelper.MaxLengthMessage('nome', 255),
  })
  nome!: string;

  @IsEmail({}, { message: ValidationMessagesHelper.invalidEmailMessage() })
  @IsNotEmpty({ message: ValidationMessagesHelper.requiredMessage('email') })
  @MaxLength(255, {
    message: ValidationMessagesHelper.MaxLengthMessage('email', 255),
  })
  email!: string;

  @IsString({ message: ValidationMessagesHelper.invalidMessage('senha') })
  @IsNotEmpty({ message: ValidationMessagesHelper.requiredMessage('senha') })
  @MinLength(6, {
    message: ValidationMessagesHelper.MinLengthMessage('senha', 6),
  })
  @MaxLength(20, {
    message: ValidationMessagesHelper.MaxLengthMessage('senha', 20),
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos 1 letra maiúscula, 1 minúscula e 1 número.',
  })
  senha!: string;
}
