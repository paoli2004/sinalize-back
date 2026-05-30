import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) {}

  /**
   *Executa uma Promise que busca uma entidade e lança erro caso não encontre.
   *
   * @template T Tipo da entidade esperada
   * @param promise Promise que retorna a entidade ou null (ex: findOne do TypeORM)
   * @param message Mensagem de erro caso a entidade não seja encontrada
   * @returns A entidade encontrada (garantido que não é null)
   */
  private async findOrFail<T>(
    promise: Promise<T | null>,
    message: string,
  ): Promise<T> {
    const result = await promise;

    if (!result) {
      throw new NotFoundException(message);
    }

    return result;
  }

  async validateEmail(email: string): Promise<void> {
    const emailAlreadyExists = await this.usuariosRepository.findOne({
      where: { email },
    });

    if (emailAlreadyExists) {
      throw new ConflictException('O e-mail informado já está em uso.');
    }
  }

  async findUsuario(id: number): Promise<Usuarios> {
    return await this.findOrFail(
      this.usuariosRepository.findOne({ where: { id } }),
      'Usuário não encontrado.',
    );
  }

  async findAllUsuarios(): Promise<Usuarios[]> {
    return await this.usuariosRepository.find({
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
    if (updateUsuarioDto.email)
      await this.validateEmail(updateUsuarioDto.email);

    const usuario = await this.findOrFail(
      this.usuariosRepository.findOne({ where: { id } }),
      'Usuário não encontrado.',
    );

    Object.assign(usuario, updateUsuarioDto);
    return await this.usuariosRepository.save(usuario);
  }

  async deleteUsuario(id: number): Promise<void> {
    const usuario = await this.findOrFail(
      this.usuariosRepository.findOne({ where: { id } }),
      'Usuário não encontrado.',
    );

    await this.usuariosRepository.remove(usuario);
  }
}
