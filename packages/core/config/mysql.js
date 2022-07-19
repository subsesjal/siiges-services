const { constants } = require('@siiges-services/shared');
require('dotenv').config({ path: constants.dotenvPath });

const mysql = {
  dbAdmin: 'mysql',
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT_MYSQL,
  dbUser: process.env.DB_USER_MYSQL,
  dbPassword: process.env.DB_PASSWORD_MYSQL,
  dbName: process.env.DB_NAME,
};

const USER = encodeURIComponent(mysql.dbUser);
const PASSWORD = encodeURIComponent(mysql.dbPassword);
const URI = `${mysql.dbAdmin}://${USER}:${PASSWORD}@${mysql.dbHost}:${mysql.dbPort}/${mysql.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'mysql',
  },
  production: {
    url: URI,
    dialect: 'mysql',
  },
};
