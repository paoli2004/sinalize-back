import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Palavras } from './entities/palavras.entity';
import { PalavrasController } from './palavras.controller';
import { PalavrasService } from './palavras.service';
import { Categorias } from '../categorias/entities/categorias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Palavras, Categorias])],
  controllers: [PalavrasController],
  providers: [PalavrasService],
  exports: [PalavrasService],
})
export class PalavrasModule {}
