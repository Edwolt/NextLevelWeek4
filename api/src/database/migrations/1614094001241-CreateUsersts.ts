import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1614094001241 {
    async up(queryRunner) {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true },
                    { name: 'name', type: 'varchar' },
                    { name: 'email', type: 'varchar' },
                    { name: 'created_at', type: 'timestamp', default: 'now()' }
                ]
            })
        )
    }

    async down(queryRunner) { await queryRunner.dropTable('users') }
}
