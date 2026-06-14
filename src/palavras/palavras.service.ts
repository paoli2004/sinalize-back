import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Palavras } from './entities/palavras.entity';
import { CreatePalavraDto } from './dto/createPalavra.dto';
import { findOrFail } from '../common/utils/query.util';
import { UpdatePalavraDto } from './dto/updatePalavra.dto';
import { Categorias } from '../categorias/entities/categorias.entity';

@Injectable()
export class PalavrasService {
  constructor(
    @InjectRepository(Palavras)
    private palavrasRepository: Repository<Palavras>,
    @InjectRepository(Categorias)
    private categoriasRepository: Repository<Categorias>,
  ) {}

  async findPalavra(id: number): Promise<Palavras> {
    return await findOrFail<Palavras>(
      this.palavrasRepository.findOne({
        where: { id },
        relations: {
          criado_por: true,
          atualizado_por: true,
          categorias: true,
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
          categorias: {
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
        categorias: true,
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
        categorias: {
          id: true,
          nome: true,
        },
      },
      order: { criado_em: 'ASC' },
    });
  }

  async createPalavras(createPalavraDto: CreatePalavraDto): Promise<Palavras> {
    const { categoryIds, ...dadosDaPalavra } = createPalavraDto;
    const usuarioId = 1;

    await this.validateCategoryIds(categoryIds);

    const palavra = this.palavrasRepository.create({
      ...dadosDaPalavra,
      criado_por: { id: usuarioId } as any,
      categorias: categoryIds.map((catId) => ({ id: catId })) as any,
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
    updatePalavraDto: UpdatePalavraDto,
  ): Promise<Palavras> {
    const usuarioId = 1;

    const palavra = await findOrFail<Palavras>(
      this.findPalavra(id),
      'Palavra não encontrada.',
    );

    const { categoryIds, ...dadosAtualizados } = updatePalavraDto;

    if (categoryIds && categoryIds.length > 0) {
      await this.validateCategoryIds(categoryIds);
    }
    
    const updatedPalavra = Object.assign(palavra, dadosAtualizados, {
      atualizado_por: { id: usuarioId } as any,
      atualizado_em: new Date(),
    });

    if (categoryIds) {
      updatedPalavra.categorias = categoryIds.map((catId) => ({
        id: catId,
      })) as any;
    }

    const palavraSalva = await this.palavrasRepository.save(updatedPalavra);

    return (await this.palavrasRepository.findOne({
      where: { id: palavraSalva.id },
      relations: {
        criado_por: true,
        atualizado_por: true,
        categorias: true,
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

  async validateCategoryIds(categoryIds: number[]): Promise<void> {
    const validate = categoryIds.map((catId) =>
      findOrFail(
        this.categoriasRepository.findOne({ where: { id: catId } }),
        `Categoria com id ${catId} não encontrada.`,
      ),
    );

    await Promise.all(validate);
  }
}
