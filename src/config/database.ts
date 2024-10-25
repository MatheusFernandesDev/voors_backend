import dotenv from 'dotenv';

dotenv.config();

const missingEnv = (variable: string) => {
  throw new Error(`Variável de ambiente ${variable} não está definida.`);
};

const viasoft_core = {
  dialect: 'postgres',
  host: process.env.DB_HOST || missingEnv('DB_HOST'),
  port: process.env.DB_PORT
    ? Number(process.env.DB_PORT)
    : missingEnv('DB_PORT'),
  username: process.env.DB_USERNAME || missingEnv('DB_USERNAME'),
  password: process.env.DB_PASSWORD || missingEnv('DB_PASSWORD'),
  database: process.env.DB_DATABASE || missingEnv('DB_DATABASE'),
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
  logging: false,
};

export default viasoft_core;
