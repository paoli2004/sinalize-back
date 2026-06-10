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
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/createCategoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get(':id')
  async findCategoria(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriasService.findCategoria(id);
  }

  @Get()
  async findAllCategorias() {
    return await this.categoriasService.findAllCategorias();
  }

  @Post()
  async createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    const newCategory =
      await this.categoriasService.createCategoria(createCategoriaDto);

    return {
      message: 'Categoria criada com sucesso',
      category: newCategory,
    };
  }

  @Patch(':id')
  async updateCategoria(
    @Body() updateCategoriaDto: CreateCategoriaDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const updatedCategory = await this.categoriasService.updateCategoria(
      id,
      updateCategoriaDto,
    );
    return {
      message: 'Categoria atualizada com sucesso',
      category: updatedCategory,
    };
  }

  @Delete(':id')
  async deleteCategoria(@Param('id', ParseIntPipe) id: number) {
    await this.categoriasService.deleteCategoria(id);

    return {
      message: 'Categoria excluída com sucesso',
    };
  }
}
