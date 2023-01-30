import { MigrationInterface, QueryRunner } from "typeorm";

export class userPassword1675025398348 implements MigrationInterface {
    name = 'userPassword1675025398348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
