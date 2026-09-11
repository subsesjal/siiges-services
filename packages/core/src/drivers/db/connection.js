const { Sequelize } = require('sequelize');

const config = require('../../../config/config');
const setupModels = require('./models');
const registerAuditHooks = require('./hooks/audit-log.hooks');

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
  pool: {
    max: 15,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

setupModels(sequelize);
registerAuditHooks(sequelize);

module.exports = sequelize;
