import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PalavrasService } from './palavras.service';
import { CreatePalavraDto } from './dto/createPalavra.dto';
import { UpdatePalavraDto } from './dto/updatePalavra.dto';

@Controller('palavras')
export class PalavrasController {
  constructor(private readonly palavrasService: PalavrasService) {}

  @Get(':id')
  async findPalavra(@Param('id', ParseIntPipe) id: number) {
    return await this.palavrasService.findPalavra(id);
  }

  @Get()
  async findAllPalavras() {
    return await this.palavrasService.findAllPalavras();
  }

  @Post()
  async createPalavra(@Body() createPalavraDto: CreatePalavraDto) {
    const newPalavra =
      await this.palavrasService.createPalavras(createPalavraDto);

    return {
      message: 'Palavra criada com sucesso.',
      palavra: newPalavra,
    };
  }

  @Patch(':id')
  async updatePalavra(
    @Body() updatePalavraDto: UpdatePalavraDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const updatedPalavra = await this.palavrasService.updatePalavra(
      id,
      updatePalavraDto,
    );

    return {
      message: 'Palavra atualizada com sucesso.',
      palavra: updatedPalavra,
    };
  }

  @Delete(':id')
  async deletePalavra(@Param('id', ParseIntPipe) id: number) {
    await this.palavrasService.deletePalavra(id);

    return {
      message: 'Palavra excluída com sucesso.',
    };
  }
}
