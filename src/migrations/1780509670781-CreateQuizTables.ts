import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuizTables1780509670781 implements MigrationInterface {
    name = 'CreateQuizTables1780509670781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" DROP CONSTRAINT "categorias_criado_por_fkey"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP CONSTRAINT "categorias_atualizado_por_fkey"`);
        await queryRunner.query(`ALTER TABLE "palavras" DROP CONSTRAINT "palavras_criado_por_fkey"`);
        await queryRunner.query(`ALTER TABLE "palavras" DROP CONSTRAINT "palavras_atualizado_por_fkey"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "palavras_categorias_id_palavra_fkey"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "palavras_categorias_id_categoria_fkey"`);
        await queryRunner.query(`CREATE TABLE "quiz_palavras" ("id" SERIAL NOT NULL, "id_quiz" integer NOT NULL, "id_palavra" integer NOT NULL, "acertou" boolean, "respondido_em" TIMESTAMP, CONSTRAINT "PK_5fefdfb452061f5921664fdd123" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quizzes" ("id" SERIAL NOT NULL, "id_usuario" integer NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD "palavra_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "PK_66f648d371648b768f54a182790" PRIMARY KEY ("palavra_id")`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD "categoria_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "PK_66f648d371648b768f54a182790"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "PK_132febf4478d17c4d0755dd32cb" PRIMARY KEY ("palavra_id", "categoria_id")`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "nome" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "email" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "criado_em" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "criado_em" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "nome" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "descricao" character varying(400) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" ALTER COLUMN "criado_em" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" ALTER COLUMN "criado_em" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "palavras" DROP COLUMN "palavra"`);
        await queryRunner.query(`ALTER TABLE "palavras" ADD "palavra" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "palavras" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "palavras" ADD "descricao" character varying(400) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "palavras" ALTER COLUMN "criado_em" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "palavras" ALTER COLUMN "criado_em" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD CONSTRAINT "FK_ed93bee7dde474d1acdaaec4fe8" FOREIGN KEY ("criado_por") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD CONSTRAINT "FK_342af5313d0247c552b5b176afc" FOREIGN KEY ("atualizado_por") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "palavras" ADD CONSTRAINT "FK_7bf24fd170da6f19baed9c7650e" FOREIGN KEY ("criado_por") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "palavras" ADD CONSTRAINT "FK_06a52ae30a8a378b7f5a637323e" FOREIGN KEY ("atualizado_por") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ADD CONSTRAINT "FK_4f39cd466fee4ea067fd4ebe0ce" FOREIGN KEY ("id_quiz") REFERENCES "quizzes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ADD CONSTRAINT "FK_0b03b637f479f38ddd20b5c6503" FOREIGN KEY ("id_palavra") REFERENCES "palavras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quizzes" ADD CONSTRAINT "FK_91ce32b8c5862f345c94e59a289" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "FK_89157aea1cf7cd0ed6457c123d6" FOREIGN KEY ("id_palavra") REFERENCES "palavras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "FK_c3d14b0c2380b471b3e35d133a4" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "FK_c3d14b0c2380b471b3e35d133a4"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "FK_89157aea1cf7cd0ed6457c123d6"`);
        await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_91ce32b8c5862f345c94e59a289"`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" DROP CONSTRAINT "FK_0b03b637f479f38ddd20b5c6503"`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" DROP CONSTRAINT "FK_4f39cd466fee4ea067fd4ebe0ce"`);
        await queryRunner.query(`ALTER TABLE "palavras" DROP CONSTRAINT "FK_06a52ae30a8a378b7f5a637323e"`);
        await queryRunner.query(`ALTER TABLE "palavras" DROP CONSTRAINT "FK_7bf24fd170da6f19baed9c7650e"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP CONSTRAINT "FK_342af5313d0247c552b5b176afc"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP CONSTRAINT "FK_ed93bee7dde474d1acdaaec4fe8"`);
        await queryRunner.query(`ALTER TABLE "palavras" ALTER COLUMN "criado_em" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "palavras" ALTER COLUMN "criado_em" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "palavras" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "palavras" ADD "descricao" character varying`);
        await queryRunner.query(`ALTER TABLE "palavras" DROP COLUMN "palavra"`);
        await queryRunner.query(`ALTER TABLE "palavras" ADD "palavra" character varying`);
        await queryRunner.query(`ALTER TABLE "categorias" ALTER COLUMN "criado_em" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "categorias" ALTER COLUMN "criado_em" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "descricao" character varying`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "nome" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "criado_em" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "criado_em" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "nome" character varying`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "PK_132febf4478d17c4d0755dd32cb"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "PK_66f648d371648b768f54a182790" PRIMARY KEY ("palavra_id")`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP COLUMN "categoria_id"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "PK_66f648d371648b768f54a182790"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP COLUMN "palavra_id"`);
        await queryRunner.query(`DROP TABLE "quizzes"`);
        await queryRunner.query(`DROP TABLE "quiz_palavras"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "palavras_categorias_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "palavras_categorias_id_palavra_fkey" FOREIGN KEY ("id_palavra") REFERENCES "palavras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE`);
        await queryRunner.query(`ALTER TABLE "palavras" ADD CONSTRAINT "palavras_atualizado_por_fkey" FOREIGN KEY ("atualizado_por") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE`);
        await queryRunner.query(`ALTER TABLE "palavras" ADD CONSTRAINT "palavras_criado_por_fkey" FOREIGN KEY ("criado_por") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD CONSTRAINT "categorias_atualizado_por_fkey" FOREIGN KEY ("atualizado_por") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD CONSTRAINT "categorias_criado_por_fkey" FOREIGN KEY ("criado_por") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE`);
    }

}
