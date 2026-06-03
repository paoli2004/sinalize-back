import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const invalidMessage = 'Preencha um valor válido para o campo';

export class CreateUsuarioDto {
  @IsString({ message: invalidMessage })
  @IsNotEmpty({ message: invalidMessage })
  nome!: string;

  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  @IsNotEmpty({ message: invalidMessage })
  email!: string;

  @IsString({ message: invalidMessage })
  @IsNotEmpty({ message: invalidMessage })
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
  @MaxLength(20, { message: 'A senha deve conter no máximo 20 caracteres.' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos 1 letra maiúscula, 1 minúscula e 1 número.',
  })
  senha!: string;
}
