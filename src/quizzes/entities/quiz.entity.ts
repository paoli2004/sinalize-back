import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Usuarios } from '../../usuarios/entities/usuarios.entity';
import { QuizPalavra } from './quiz_palavras.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'id_usuario' })
  id_usuario!: number;

  @CreateDateColumn({ name: 'criado_em' })
  criado_em!: Date;

  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuarios;

  @OneToMany(() => QuizPalavra, (qp) => qp.quiz)
  quiz_palavras!: QuizPalavra[];
}
