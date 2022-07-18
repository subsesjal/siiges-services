// Drivers
// const { drivers } = require('@siiges-services/core');
const sequelize = require('../drivers/db/connection');

// Domains
const { findQuery, findOneQuery, createQuery } = require('./usuarios');

// define the target model
const usuarioModel = sequelize.model('Usuario');

module.exports = {
  findOneQuery: findOneQuery(usuarioModel),
  findQuery: findQuery(usuarioModel),
  createQuery: createQuery(usuarioModel),
};
