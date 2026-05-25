import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuarios } from '../../usuarios/entities/usuarios.entity';

@Entity({ name: 'categorias' })
export class Categorias {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  nome!: string;

  @Column({ length: 400 })
  descricao!: string;

  @ManyToOne(() => Usuarios, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'criado_por' })
  criado_por!: Usuarios;

  @CreateDateColumn({ type: 'timestamp' })
  criado_em!: Date;

  @ManyToOne(() => Usuarios, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'atualizado_por' })
  atualizado_por?: Usuarios;

  @Column({ type: 'timestamp', nullable: true })
  atualizado_em?: Date;
}
