// src/data-source.js (rename a .js para evitar problemas de TS + Node)
const { DataSource } = require('typeorm');

const commonConfig = {
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: false,
};

let dataSourceOptions;

switch (process.env.NODE_ENV) {
  case 'development':
    dataSourceOptions = {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/entities/*.js'],
      ...commonConfig,
    };
    break;
  case 'test':
    dataSourceOptions = {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['src/entities/*.ts'],
      migrationsRun: true,
      keepConnectionAlive: true,
      ...commonConfig,
    };
    break;
  case 'production':
    dataSourceOptions = {};
    break;
  default:
    throw new Error('Unknown environment');
}

module.exports = new DataSource(dataSourceOptions);
