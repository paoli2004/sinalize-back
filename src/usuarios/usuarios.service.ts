import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { findOrFail } from '../common/utils/query.util';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) {}

  async validateEmail(email: string): Promise<void> {
    const emailAlreadyExists = await this.usuariosRepository.findOne({
      where: { email },
    });

    if (emailAlreadyExists) {
      throw new ConflictException('O e-mail informado já está em uso.');
    }
  }

  async findUsuario(id: number): Promise<Usuarios> {
    return findOrFail(
      this.usuariosRepository.findOne({ where: { id } }),
      'Usuário não encontrado.',
    );
  }

  async findAllUsuarios(): Promise<Usuarios[]> {
    return this.usuariosRepository.find({
      order: { criado_em: 'ASC' },
    });
  }

  async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuarios> {
    await this.validateEmail(createUsuarioDto.email);
    const usuario = this.usuariosRepository.create(createUsuarioDto);
    return await this.usuariosRepository.save(usuario);
  }

  async updateUsuario(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuarios> {
    if (updateUsuarioDto.email) {
      await this.validateEmail(updateUsuarioDto.email);
    }

    const usuario = await findOrFail(
      this.usuariosRepository.findOne({ where: { id } }),
      'Usuário não encontrado.',
    );

    Object.assign(usuario, updateUsuarioDto);
    return this.usuariosRepository.save(usuario);
  }

  async deleteUsuario(id: number): Promise<void> {
    const usuario = await findOrFail(
      this.usuariosRepository.findOne({ where: { id } }),
      'Usuário não encontrado.',
    );

    await this.usuariosRepository.remove(usuario);
  }
}
