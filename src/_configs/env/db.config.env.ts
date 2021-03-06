import { Stock } from 'src/stock/entities/stock.entity';

export const db_config_env = {
  test: {
    type: 'sqlite',
    database: 'wa_db',
    entities: [Stock],
    synchronize: true,
    cli: {
      migrationsDir: 'src/migration',
    },
    migrations: ['src/migration/*{.ts,.js}'],
  },
  development: {
    type: process.env.DATABASE_TYPE || 'mysql',
    host: parseInt(process.env.DATABASE_HOST) || 'db',
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME || 'wa_db',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'root',
    entities: [Stock],
    synchronize: true,
    cli: {
      migrationsDir: 'src/migration',
    },
    migrations: ['src/migration/*{.ts,.js}'],
  },
  production: {
    type: 'sqlite',
    database: 'wa_db',
    entities: [Stock],
    synchronize: true,
    cli: {
      migrationsDir: 'src/migration',
    },
    migrations: ['src/migration/*{.ts,.js}'],
  },
};
