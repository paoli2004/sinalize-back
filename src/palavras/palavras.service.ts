import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Palavras } from './entities/palavras.entity';
import { CreatePalavrasDto } from './dto/createPalavras.dto';
import { findOrFail } from '../common/utils/query.util';
import { NOMEM } from 'dns';
import { UpdatePalavrasDto } from './dto/updatePalavras.dto';

@Injectable()
export class PalavrasService {
  constructor(
    @InjectRepository(Palavras)
    private palavrasRepository: Repository<Palavras>,
  ) {}

  async findPalavra(id: number): Promise<Palavras> {
    return await findOrFail<Palavras>(
      this.palavrasRepository.findOne({
        where: { id },
        relations: {
          criado_por: true,
          atualizado_por: true,
        },
        select: {
          id: true,
          palavra: true,
          descricao: true,
          criado_em: true,
          atualizado_em: true,
          criado_por: {
            id: true,
            nome: true,
          },
          atualizado_por: {
            id: true,
            nome: true,
          },
        },
      }),
      'Palavra não encontrada.',
    );
  }

  async findAllPalavras(): Promise<Palavras[]> {
    return await this.palavrasRepository.find({
      relations: {
        criado_por: true,
        atualizado_por: true,
      },
      select: {
        id: true,
        palavra: true,
        descricao: true,
        criado_em: true,
        criado_por: {
          id: true,
          nome: true,
        },
        atualizado_por: {
          id: true,
          nome: true,
        },
      },
      order: { criado_em: 'ASC' },
    });
  }

  async createPalavras(
    createPalavrasDto: CreatePalavrasDto,
  ): Promise<Palavras> {
    const usuarioId = 1;

    const palavra = this.palavrasRepository.create({
      ...createPalavrasDto,
      criado_por: { id: usuarioId } as any,
    });

    const novaPalavra = await this.palavrasRepository.save(palavra);

    return (await this.palavrasRepository.findOne({
      where: { id: novaPalavra.id },
      relations: {
        criado_por: true,
      },
    })) as Palavras;
  }

  async updatePalavra(
    id: number,
    updatePalavrasDto: UpdatePalavrasDto,
  ): Promise<Palavras> {
    const usuarioId = 1;

    const palavra = await findOrFail<Palavras>(
      this.findPalavra(id),
      'Palavra não encontrada.',
    );

    const updatedPalavra = Object.assign(palavra, updatePalavrasDto, {
      atualizado_por: { id: usuarioId } as any,
      atualizado_em: new Date(),
    });

    const palavraSalva = await this.palavrasRepository.save(updatedPalavra);

    return (await this.palavrasRepository.findOne({
      where: { id: palavraSalva.id },
      relations: {
        criado_por: true,
        atualizado_por: true,
      },
    })) as Palavras;
  }

  async deletePalavra(id: number): Promise<void> {
    const palavra = await findOrFail<Palavras>(
      this.findPalavra(id),
      'Palavra não encontrada.',
    );

    await this.palavrasRepository.remove(palavra);
  }
}
