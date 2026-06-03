import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';
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

  @ManyToOne(() => Quiz, (quiz) => quiz.quiz_palavras)
  @JoinColumn({ name: 'id_quiz' })
  quiz!: Quiz;

  @ManyToOne(() => Palavras)
  @JoinColumn({ name: 'id_palavra' })
  palavra!: Palavras;
}
