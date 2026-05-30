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
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get(':id')
  async findUsuario(@Param('id', ParseIntPipe) id: number) {
    return await this.usuariosService.findUsuario(id);
  }

  @Get()
  async findAllUsuarios() {
    return await this.usuariosService.findAllUsuarios();
  }

  @Post()
  async createUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    const newUser = await this.usuariosService.createUsuario(createUsuarioDto);

    return {
      message: 'Usuário criado com sucesso',
      user: newUser,
    };
  }

  @Patch(':id')
  async updateUsuario(
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const updatedUser = await this.usuariosService.updateUsuario(
      id,
      updateUsuarioDto,
    );

    return {
      message: 'Usuário atualizado com sucesso',
      user: updatedUser,
    };
  }

  @Delete(':id')
  async deleteUsuario(@Param('id', ParseIntPipe) id: number) {
    await this.usuariosService.deleteUsuario(id);

    return {
      message: 'Usuário excluído com sucesso',
    };
  }
}
