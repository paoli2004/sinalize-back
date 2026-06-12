import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quizzes } from './entities/quizzes.entity';
import { Repository } from 'typeorm';
import { findOrFail } from '../common/utils/query.util';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quizzes)
    private quizzesRepository: Repository<Quizzes>,
  ) {}

  async findQuiz(id: number): Promise<Quizzes> {
    return await findOrFail<Quizzes>(
      this.quizzesRepository.findOne({
        where: { id },
        relations: {
          usuario: true,
        },
        select: {
          id: true,
          usuario: {
            id: true,
            nome: true,
            email: true,
          },
        },
      }),
      'Quiz não encontrado',
    );
  }

  async findAllQuizzes(): Promise<Quizzes[]> {
    return await this.quizzesRepository.find({
      relations: {
        usuario: true,
      },
      select: {
        id: true,
        usuario: {
          id: true,
          nome: true,
          email: true,
        },
      },
      order: { criado_em: 'ASC' },
    });
  }

  async createQuiz(usuarioId: number): Promise<Quizzes> {
    const quiz = this.quizzesRepository.create({
      usuario: { id: usuarioId } as any,
    });

    const newQuiz = await this.quizzesRepository.save(quiz);

    return (await this.quizzesRepository.findOne({
      where: { id: newQuiz.id },
      relations: {
        usuario: true,
      },
      select: {
        id: true,
        criado_em: true,
        usuario: {
          id: true,
          nome: true,
        },
      },
    })) as Quizzes;
  }
}
