import core from '../database/connection';
import fs from 'fs';
import path from 'path';

const migrationName = process.argv[2]; // Nome da migration passada como argumento

(async () => {
  try {
    await core.connection?.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    const queryInterface = core.connection?.getQueryInterface();
    const migrationsDir = path.join(__dirname, '../database/migrations');

    // Verifica se o nome da migration foi passado
    if (!migrationName) {
      console.error('Por favor, forneça o nome da migration para rollback.');
      return;
    }

    // Remove a extensão .ts se estiver presente
    const migrationFileName = migrationName.endsWith('.ts')
      ? migrationName.slice(0, -3)
      : migrationName;
    const migrationFile = path.join(migrationsDir, `${migrationFileName}.ts`);

    // Listar arquivos de migration
    const migrationFiles = fs.readdirSync(migrationsDir);
    console.log('Arquivos de migration encontrados:', migrationFiles);

    // Verifica se a migration existe
    if (!fs.existsSync(migrationFile)) {
      console.error(
        `Migration ${migrationFileName} não encontrada em ${migrationsDir}.`,
      );
      return;
    }

    const migration = require(migrationFile).default;

    // Executa o método down da migration específica
    await migration.down(queryInterface);
    console.log(
      `Rollback da migration ${migrationFileName} executado com sucesso!`,
    );
  } catch (error) {
    console.error('Erro ao rodar rollback:', error);
  } finally {
    await core.connection?.close();
  }
})();
