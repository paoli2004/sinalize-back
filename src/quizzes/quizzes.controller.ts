import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
  async createQuiz() {
    const usuarioId = 1;

    const newQuiz = await this.quizzesService.createQuiz(usuarioId);

    return {
      message: 'Quiz criado com sucesso!',
      quiz: newQuiz,
    };
  }
}
