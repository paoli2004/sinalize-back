import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Usuarios } from '../../usuarios/entities/usuarios.entity';
import { Categorias } from '../../categorias/entities/categorias.entity';

@Entity({ name: 'palavras' })
export class Palavras {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  palavra!: string;

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

  @ManyToMany(() => Categorias, (categoria) => categoria.palavras)
  @JoinTable({
    name: 'palavras_categorias',
    joinColumn: { name: 'palavra_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoria_id', referencedColumnName: 'id' },
  })
  categorias!: Categorias[];
}
