import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Quizzes } from './quizzes.entity';
import { Palavras } from '../../palavras/entities/palavras.entity';

@Entity('quiz_palavras')
export class QuizPalavra {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'id_quiz' })
  id_quiz!: number;

  @Column({ name: 'id_palavra' })
  id_palavra!: number;

  @Column({ nullable: true })
  acertou!: boolean;

  @Column({ name: 'respondido_em', nullable: true })
  respondido_em!: Date;

  @ManyToOne(() => Quizzes, (quiz) => quiz.quiz_palavras)
  @JoinColumn({ name: 'id_quiz' })
  quiz!: Quizzes;

  @ManyToOne(() => Palavras)
  @JoinColumn({ name: 'id_palavra' })
  palavra!: Palavras;
}
