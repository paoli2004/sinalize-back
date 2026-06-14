import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Palavras } from './palavras.entity';
import { Categorias } from '../../categorias/entities/categorias.entity';

@Entity('palavras_categorias')
export class PalavrasCategorias {
  @PrimaryColumn({ type: 'int' })
  palavra_id!: number;

  @ManyToOne(() => Palavras, (palavra) => palavra.categorias, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'palavra_id' })
  palavra!: Palavras;

  @PrimaryColumn({ type: 'int' })
  categoria_id!: number;

  @ManyToOne(() => Categorias, (categoria) => categoria.palavras, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria!: Categorias;
}
