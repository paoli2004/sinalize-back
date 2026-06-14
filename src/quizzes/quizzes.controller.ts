import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get(':id')
  async findQuiz(@Param('id', ParseIntPipe) id: number) {
    return await this.quizzesService.findQuiz(id);
  }

  @Get()
  async findAllQuizzes() {
    return await this.quizzesService.findAllQuizzes();
  }

  @Post()
  async create(@Query('categoriaIds') categoriaIdsString: string) {
    const usuarioLogadoId = 1;

    if (!categoriaIdsString) {
      throw new BadRequestException('O parâmetro categoriaIds é obrigatório.');
    }

    const categoriaIds = categoriaIdsString
      .split(',')
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));

    if (categoriaIds.length === 0) {
      throw new BadRequestException(
        'Informe pelo menos um ID de categoria válido.',
      );
    }

    const newQuiz = await this.quizzesService.createQuiz(
      usuarioLogadoId,
      categoriaIds,
    );

    return {
      message: 'Quiz criado com sucesso',
      quiz: newQuiz,
    };
  }
}
