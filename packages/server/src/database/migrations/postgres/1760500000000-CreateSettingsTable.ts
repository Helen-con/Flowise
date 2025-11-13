import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSettingsTable1760500000000 implements MigrationInterface {
    name = 'CreateSettingsTable1760500000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS setting (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                "key" varchar NOT NULL,
                "value" text,
                "valueType" varchar NOT NULL DEFAULT 'string',
                "workspaceId" text NULL,
                "createdDate" timestamp NOT NULL DEFAULT now(),
                "updatedDate" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_setting_id" PRIMARY KEY (id),
                CONSTRAINT "UQ_setting_key_workspace" UNIQUE ("key","workspaceId")
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE setting`)
    }
}
