import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import core from './database/connection';

dotenv.config();

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      }),
    );
  }

  routes() {
    this.server.use(routes);
  }

  async database() {
    try {
      if (!core.connection) {
        throw new Error('Conexão com o banco de dados não inicializada');
      }
      await core.connection.authenticate();
    } catch (error: any) {
      console.error(
        `Erro ao conectar ao banco de dados: ${error.message}`,
        error,
      );
      process.exit(1);
    }
  }

  start() {
    const port = process.env.PORT;
    this.server.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}`);
    });
  }
}

const app = new App();
app.start();
