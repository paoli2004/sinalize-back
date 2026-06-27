import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quizzes } from './entities/quizzes.entity';
import { In, Repository } from 'typeorm';
import { findOrFail } from '../common/utils/query.util';
import { QuizPalavras } from './entities/quiz_palavras.entity';
import { Palavras } from '../palavras/entities/palavras.entity';
import { Categorias } from '../categorias/entities/categorias.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quizzes)
    private quizzesRepository: Repository<Quizzes>,
    @InjectRepository(QuizPalavras)
    private quizPalavrasRepository: Repository<QuizPalavras>,
    @InjectRepository(Palavras)
    private palavrasRepository: Repository<Palavras>,
    @InjectRepository(Categorias)
    private categoriasRepository: Repository<Categorias>,
  ) {}

  async findQuiz(id: number): Promise<Quizzes> {
    return await findOrFail<Quizzes>(
      this.quizzesRepository.findOne({
        where: { id },
        relations: {
          usuario: true,
          quiz_palavras: {
            palavra: {
              categorias: true,
            },
          },
        },
        select: {
          id: true,
          usuario: {
            id: true,
            nome: true,
            email: true,
          },
          quiz_palavras: {
            id: true,
            palavra: {
              id: true,
              palavra: true,
              categorias: {
                id: true,
                nome: true,
              },
            },
            acertou: true,
            respondido_em: true,
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
        quiz_palavras: {
          palavra: {
            categorias: true,
          },
        },
      },
      select: {
        id: true,
        usuario: {
          id: true,
          nome: true,
          email: true,
        },
        quiz_palavras: {
          id: true,
          palavra: {
            id: true,
            palavra: true,
            categorias: {
              id: true,
              nome: true,
            },
          },
          acertou: true,
          respondido_em: true,
        },
      },
      order: { criado_em: 'ASC' },
    });
  }

  async createQuiz(
    usuarioId: number,
    categoriaIds: number[],
  ): Promise<Quizzes> {
    const categoriasEncontradas = await this.categoriasRepository.findBy({
      id: In(categoriaIds),
    });

    if (categoriasEncontradas.length !== categoriaIds.length) {
      throw new NotFoundException(
        'Uma ou mais categorias informadas não foram encontradas no sistema.',
      );
    }
    const palavrasSelecionadas = await this.palavrasRepository
      .createQueryBuilder('palavra')
      .innerJoin('palavra.categorias', 'categoria') // caso venha categoria na requisição, filtra a mesma na entidade associativa
      .where('categoria.id IN (:...categoriaIds)', { categoriaIds })
      .orderBy('RANDOM()') // palavra sorteada do banco
      .limit(5) // tamanho do quiz
      .getMany();

    if (palavrasSelecionadas.length === 0) {
      throw new NotFoundException(
        'Não há palavras cadastradas para a categoria selecionada.',
      );
    }

    const quiz = this.quizzesRepository.create({
      usuario: { id: usuarioId } as any,
    });

    const newQuiz = await this.quizzesRepository.save(quiz);

    const itensQuiz = palavrasSelecionadas.map((palavra) => {
      return this.quizPalavrasRepository.create({
        quiz: { id: newQuiz.id } as any,
        palavra: { id: palavra.id } as any,
      });
    });

    await this.quizPalavrasRepository.save(itensQuiz);

    return (await this.quizzesRepository.findOne({
      where: { id: newQuiz.id },
      relations: {
        usuario: true,
        quiz_palavras: {
          palavra: {
            categorias: true,
          },
        },
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
