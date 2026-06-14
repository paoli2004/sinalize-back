import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialDatabaseSchema1781467072087 implements MigrationInterface {
    name = 'CreateInitialDatabaseSchema1781467072087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "senha" character varying(20) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "palavras" ("id" SERIAL NOT NULL, "palavra" character varying(255) NOT NULL, "descricao" character varying(400) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP, "criado_por" integer, "atualizado_por" integer, CONSTRAINT "PK_adf50b25d1a5626921e33c3a244" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "descricao" character varying(400) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP, "criado_por" integer, "atualizado_por" integer, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "palavras_categorias" ("palavra_id" integer NOT NULL, "categoria_id" integer NOT NULL, CONSTRAINT "PK_132febf4478d17c4d0755dd32cb" PRIMARY KEY ("palavra_id", "categoria_id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_palavras" ("id" SERIAL NOT NULL, "acertou" boolean, "respondido_em" TIMESTAMP, "id_quiz" integer, "id_palavra" integer, CONSTRAINT "PK_5fefdfb452061f5921664fdd123" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quizzes" ("id" SERIAL NOT NULL, "id_usuario" integer NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_66f648d371648b768f54a18279" ON "palavras_categorias"  ("palavra_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f79f63eb019060537ebdeede0b" ON "palavras_categorias"  ("categoria_id") `);
        await queryRunner.query(`ALTER TABLE "palavras" ADD CONSTRAINT "FK_7bf24fd170da6f19baed9c7650e" FOREIGN KEY ("criado_por") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "palavras" ADD CONSTRAINT "FK_06a52ae30a8a378b7f5a637323e" FOREIGN KEY ("atualizado_por") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD CONSTRAINT "FK_ed93bee7dde474d1acdaaec4fe8" FOREIGN KEY ("criado_por") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD CONSTRAINT "FK_342af5313d0247c552b5b176afc" FOREIGN KEY ("atualizado_por") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "FK_66f648d371648b768f54a182790" FOREIGN KEY ("palavra_id") REFERENCES "palavras"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "FK_f79f63eb019060537ebdeede0b6" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ADD CONSTRAINT "FK_4f39cd466fee4ea067fd4ebe0ce" FOREIGN KEY ("id_quiz") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ADD CONSTRAINT "FK_0b03b637f479f38ddd20b5c6503" FOREIGN KEY ("id_palavra") REFERENCES "palavras"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quizzes" ADD CONSTRAINT "FK_91ce32b8c5862f345c94e59a289" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_91ce32b8c5862f345c94e59a289"`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" DROP CONSTRAINT "FK_0b03b637f479f38ddd20b5c6503"`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" DROP CONSTRAINT "FK_4f39cd466fee4ea067fd4ebe0ce"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "FK_f79f63eb019060537ebdeede0b6"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "FK_66f648d371648b768f54a182790"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP CONSTRAINT "FK_342af5313d0247c552b5b176afc"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP CONSTRAINT "FK_ed93bee7dde474d1acdaaec4fe8"`);
        await queryRunner.query(`ALTER TABLE "palavras" DROP CONSTRAINT "FK_06a52ae30a8a378b7f5a637323e"`);
        await queryRunner.query(`ALTER TABLE "palavras" DROP CONSTRAINT "FK_7bf24fd170da6f19baed9c7650e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f79f63eb019060537ebdeede0b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66f648d371648b768f54a18279"`);
        await queryRunner.query(`DROP TABLE "quizzes"`);
        await queryRunner.query(`DROP TABLE "quiz_palavras"`);
        await queryRunner.query(`DROP TABLE "palavras_categorias"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "palavras"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
