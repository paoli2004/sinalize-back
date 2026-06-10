import { NotFoundException } from '@nestjs/common';

/**
 * Executa uma Promise que busca uma entidade e lança erro caso não encontre.
 *
 * @template T Tipo da entidade esperada
 * @param promise Promise que retorna a entidade ou null (ex: findOne do TypeORM)
 * @param message Mensagem de erro caso a entidade não seja encontrada
 * @returns A entidade encontrada (garantido que não é null)
 */
export async function findOrFail<T>(
  promise: Promise<T | null>,
  message: string,
): Promise<T> {
  const result = await promise;

  if (!result) {
    throw new NotFoundException(message);
  }

  return result;
}
