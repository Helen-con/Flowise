import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSettingsTable1760500000000 implements MigrationInterface {
    name = 'CreateSettingsTable1760500000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "setting" ("id" varchar PRIMARY KEY NOT NULL, "key" varchar NOT NULL, "value" text, "valueType" varchar NOT NULL DEFAULT ('string'), "workspaceId" text, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_setting_key_workspace" UNIQUE ("key","workspaceId"));`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "setting"`)
    }
}
