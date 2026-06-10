import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuarios {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  nome!: string;

  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ length: 20, select: false })
  senha!: string;

  @CreateDateColumn({ type: 'timestamp' })
  criado_em!: Date;
}
