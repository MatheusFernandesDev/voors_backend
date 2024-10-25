import core from '../database/connection';
import fs from 'fs';
import path from 'path';

(async () => {
  try {
    // Inicia a conexão com o banco de dados
    await core.connection?.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    const queryInterface = core.connection?.getQueryInterface();
    const migrationsDir = path.join(__dirname, '../database/migrations');

    // Criação da tabela SequelizeMeta se não existir
    const createTableResult = await queryInterface?.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "SequelizeMeta" (
        "name" VARCHAR(255) NOT NULL PRIMARY KEY
      );
    `);

    // Lê todos os arquivos de migration
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.ts'));

    // Obtém as migrations já aplicadas
    const appliedMigrations = await queryInterface?.sequelize.query(
      'SELECT name FROM "SequelizeMeta"',
    );
    let appliedMigrationNames: string[] = appliedMigrations?.length
      ? appliedMigrations[0].map((row: any) => row.name)
      : [];

    // Executa cada migration que ainda não foi aplicada
    for (const file of migrationFiles) {
      if (!appliedMigrationNames.includes(file)) {
        try {
          const migration = require(path.join(migrationsDir, file)).default;
          await migration.up(queryInterface);
          console.log(`Migration ${file} executada com sucesso!`);

          // Registra a migration como aplicada
          await queryInterface?.sequelize.query(
            'INSERT INTO "SequelizeMeta" (name) VALUES (?)',
            { replacements: [file] },
          );
        } catch (migrationError) {
          console.error(
            `Erro ao executar a migration ${file}:`,
            migrationError,
          );
        }
      } else {
        console.log(`Migration ${file} já foi aplicada.`);
      }
    }

    console.log('Todas as migrations rodadas com sucesso.');
  } catch (error) {
    console.error('Erro ao rodar migrations:', error);
  } finally {
    // Fecha a conexão após as migrations
    await core.connection?.close();
  }
})();
