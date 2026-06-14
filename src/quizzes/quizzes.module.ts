import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quizzes } from './entities/quizzes.entity';
import { QuizPalavras } from './entities/quiz_palavras.entity';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Palavras } from '../palavras/entities/palavras.entity';
import { Categorias } from '../categorias/entities/categorias.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quizzes, QuizPalavras, Palavras, Categorias]),
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService],
})
export class QuizzesModule {}
