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

  @Column({ type: 'boolean', nullable: true })
  acertou?: boolean;

  @Column({ type: 'timestamp', name: 'respondido_em', nullable: true })
  respondido_em?: Date;

  @ManyToOne(() => Quizzes, (quiz) => quiz.quiz_palavras, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_quiz' })
  quiz!: Quizzes;

  @ManyToOne(() => Palavras, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_palavra' })
  palavra!: Palavras;
}
