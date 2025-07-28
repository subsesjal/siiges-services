const { Sequelize } = require('sequelize');

const config = require('../../../config/config');
const setupModels = require('./models');

const { mysql } = config;
const {
  dbHost, dbPort, dbUser, dbPassword, dbName, dbAdmin, dbLogging,
} = mysql;

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const URI = `${dbAdmin}://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: `${dbAdmin}`,
  logging: dbLogging === 'true' || false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

setupModels(sequelize);

module.exports = sequelize;
