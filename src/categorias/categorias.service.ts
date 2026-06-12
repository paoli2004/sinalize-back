import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorias } from './entities/categorias.entity';
import { findOrFail } from '../common/utils/query.util';
import { CreateCategoriaDto } from './dto/createCategoria.dto';
import { UpdateCategoriaDto } from './dto/updateCategoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categorias)
    private categoriasRepository: Repository<Categorias>,
  ) {}

  async findCategoria(id: number): Promise<Categorias> {
    return await findOrFail<Categorias>(
      this.categoriasRepository.findOne({
        where: { id },
        relations: {
          criado_por: true,
          atualizado_por: true,
        },
        select: {
          id: true,
          nome: true,
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
      'Categoria não encontrada.',
    );
  }

  async findAllCategorias(): Promise<Categorias[]> {
    return await this.categoriasRepository.find({
      relations: {
        criado_por: true,
        atualizado_por: true,
      },
      select: {
        id: true,
        nome: true,
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

  async createCategoria(
    createCategoriaDto: CreateCategoriaDto,
  ): Promise<Categorias> {
    const usuarioLogadoId = 1;

    const categoria = this.categoriasRepository.create({
      ...createCategoriaDto,
      criado_por: { id: usuarioLogadoId } as any,
    });

    const novaCategoria = await this.categoriasRepository.save(categoria);

    return (await this.categoriasRepository.findOne({
      where: { id: novaCategoria.id },
      relations: {
        criado_por: true,
      },
    })) as Categorias;
  }

  async updateCategoria(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categorias> {
    const usuarioLogadoId = 1;

    const categoria = await findOrFail<Categorias>(
      this.findCategoria(id),
      'Categoria não encontrada.',
    );

    const updatedCategory = Object.assign(categoria, updateCategoriaDto, {
      atualizado_por: { id: usuarioLogadoId } as any,
      atualizado_em: new Date(),
    });

    const categoriaSalva =
      await this.categoriasRepository.save(updatedCategory);

    return (await this.categoriasRepository.findOne({
      where: { id: categoriaSalva.id },
      relations: {
        criado_por: true,
        atualizado_por: true,
      },
    })) as Categorias;
  }

  async deleteCategoria(id: number): Promise<void> {
    const categoria = await findOrFail<Categorias>(
      this.findCategoria(id),
      'Categoria não encontrada.',
    );

    await this.categoriasRepository.remove(categoria);
  }
}
