export class ValidationMessagesHelper {
  static requiredMessage(campo: string): string {
    return `O campo ${campo} é obrigatório.`;
  }

  static invalidMessage(campo: string): string {
    return `Preencha um valor válido para o campo ${campo}`;
  }

  static invalidEmailMessage(): string {
    return 'O e-mail informado é inválido';
  }

  static minLengthMessage(campo: string, min: number): string {
    return `O campo ${campo} deve conter no mínimo ${min} caracteres.`;
  }

  static maxLengthMessage(campo: string, max: number): string {
    return `O campo ${campo} deve conter no máximo ${max} caracteres.`;
  }

  static invalidFormatMessage(campo: string): string {
    return `O campo ${campo} possui um formato inválido.`;
  }

  static isNotIntegerMessage(campo: string): string {
    return `O campo ${campo} deve ser um número inteiro.`;
  }

  static isNotAssociateToCategoryMessage(): string {
    return 'A palavra deve estar associada a pelo menos uma categoria.';
  }
}
