import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSurveysUsers1614271759521 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'surveys_users',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true },
                    { name: 'user_id', type: 'uuid' },
                    { name: 'survey_id', type: 'uuid' },
                    { name: 'value', type: 'number', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' }
                ],
                foreignKeys: [
                    {
                        name: 'FKUser',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKServey',
                        referencedTableName: 'surveys',
                        referencedColumnNames: ['id'],
                        columnNames: ['survey_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
        // await queryRunner.createForeignKey(...)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Se estivesse criando a foreign key separada ela teria que ser deletada antes da tabela
        await queryRunner.dropTable('surveys_users')
    }

}
