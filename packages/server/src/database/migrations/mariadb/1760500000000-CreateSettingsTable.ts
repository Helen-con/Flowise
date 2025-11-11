import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSettingsTable1760500000000 implements MigrationInterface {
    name = 'CreateSettingsTable1760500000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS \`setting\` (
                \`id\` varchar(36) NOT NULL,
                \`key\` varchar(255) NOT NULL,
                \`value\` text DEFAULT NULL,
                \`valueType\` varchar(255) NOT NULL DEFAULT 'string',
                \`workspaceId\` varchar(255) DEFAULT NULL,
                \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                UNIQUE KEY \`UQ_setting_key_workspace\` (\`key\`,\`workspaceId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`setting\``)
    }
}
