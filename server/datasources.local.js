'use strict';
const envConfig = process.env.MODEL_DATASOURCE;

const modelDatasource = {
  elephant: {
    connector: 'postgresql',
    url: process.env.PG_MAIN_URL,
  },
  reserve: {
    connector: 'postgresql',
    url: process.env.PG_RESERVE_URL,
  },
  mongoLab: {
    connector: 'mongodb',
    url: process.env.MLAB_URL,
  },
};

module.exports = {
  modelConfig: modelDatasource[envConfig],
};

// ALL_DB_OPTIONS: {
//   connector: 'postgresql',
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT,
//   user: process.env.PG_RESERVE_USER,
//   password: process.env.PG_RESERVE_PASS,
//   database: process.env.PG_RESERVE_DB,
//   url: process.env.PG_RESERVE_URL,
//   name: process.env.PG_RESERVE_NAME,
// },
