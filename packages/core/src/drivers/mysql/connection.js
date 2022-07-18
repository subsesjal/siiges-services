const { Sequelize } = require('sequelize');
const { development } = require('../../../config/mysql');

const sequelize = new Sequelize(development.url, {
  dialect: `${development.dialect}`,
  logging: true,
});

module.exports = sequelize;
