import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Palavras } from './palavras.entity';
import { Categorias } from '../../categorias/entities/categorias.entity';

// Entidade associativa
// Armazena a relação muitos-para-muitos entre Palavras e Categorias
@Entity('palavras_categorias')
export class PalavrasCategorias {
  @PrimaryColumn()
  palavra_id!: number;

  @PrimaryColumn()
  categoria_id!: number;

  @ManyToOne(() => Palavras)
  @JoinColumn({ name: 'id_palavra' })
  palavra!: Palavras;

  @ManyToOne(() => Categorias)
  @JoinColumn({ name: 'id_categoria' })
  categoria!: Categorias;
}
