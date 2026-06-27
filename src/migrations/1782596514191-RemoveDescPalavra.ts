import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDescPalavra1782596514191 implements MigrationInterface {
    name = 'RemoveDescPalavra1782596514191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "FK_66f648d371648b768f54a182790"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "FK_f79f63eb019060537ebdeede0b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66f648d371648b768f54a18279"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f79f63eb019060537ebdeede0b"`);
        await queryRunner.query(`ALTER TABLE "palavras" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" DROP CONSTRAINT "FK_4f39cd466fee4ea067fd4ebe0ce"`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" DROP CONSTRAINT "FK_0b03b637f479f38ddd20b5c6503"`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ALTER COLUMN "id_quiz" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ALTER COLUMN "id_palavra" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ALTER COLUMN "id_quiz" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ALTER COLUMN "id_palavra" SET NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_66f648d371648b768f54a18279" ON "palavras_categorias"  ("palavra_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f79f63eb019060537ebdeede0b" ON "palavras_categorias"  ("categoria_id") `);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "FK_66f648d371648b768f54a182790" FOREIGN KEY ("palavra_id") REFERENCES "palavras"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "FK_f79f63eb019060537ebdeede0b6" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ADD CONSTRAINT "FK_4f39cd466fee4ea067fd4ebe0ce" FOREIGN KEY ("id_quiz") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ADD CONSTRAINT "FK_0b03b637f479f38ddd20b5c6503" FOREIGN KEY ("id_palavra") REFERENCES "palavras"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz_palavras" DROP CONSTRAINT "FK_0b03b637f479f38ddd20b5c6503"`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" DROP CONSTRAINT "FK_4f39cd466fee4ea067fd4ebe0ce"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "FK_f79f63eb019060537ebdeede0b6"`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" DROP CONSTRAINT "FK_66f648d371648b768f54a182790"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f79f63eb019060537ebdeede0b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66f648d371648b768f54a18279"`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ALTER COLUMN "id_palavra" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ALTER COLUMN "id_quiz" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ALTER COLUMN "id_palavra" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ALTER COLUMN "id_quiz" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ADD CONSTRAINT "FK_0b03b637f479f38ddd20b5c6503" FOREIGN KEY ("id_palavra") REFERENCES "palavras"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_palavras" ADD CONSTRAINT "FK_4f39cd466fee4ea067fd4ebe0ce" FOREIGN KEY ("id_quiz") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "palavras" ADD "descricao" character varying(400) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_f79f63eb019060537ebdeede0b" ON "palavras_categorias" USING btree ("categoria_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_66f648d371648b768f54a18279" ON "palavras_categorias" USING btree ("palavra_id") `);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "FK_f79f63eb019060537ebdeede0b6" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "palavras_categorias" ADD CONSTRAINT "FK_66f648d371648b768f54a182790" FOREIGN KEY ("palavra_id") REFERENCES "palavras"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
