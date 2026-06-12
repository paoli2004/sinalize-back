import { UsuariosModule } from './usuarios/usuarios.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { PalavrasModule } from './palavras/palavras.module';

@Module({
  imports: [
    UsuariosModule,
    CategoriasModule,
    QuizzesModule,
    PalavrasModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
})
export class AppModule {}
