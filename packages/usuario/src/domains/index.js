// Drivers
const { drivers } = require('@siiges-services/core');

const { sequelize } = drivers;

// Domains
const {
  findAllQuery,
  findOneQuery,
  findOneDetailedQuery,
  createQuery,
  updateQuery,
  deleteQuery,
} = require('./usuarios');

// define the target model
const usuarioModel = sequelize.model('Usuario');
const personaModel = sequelize.model('Persona');

module.exports = {
  findOneQuery: findOneQuery(usuarioModel),
  findOneDetailedQuery: findOneDetailedQuery(usuarioModel),
  findAllQuery: findAllQuery(usuarioModel),
  createQuery: createQuery(usuarioModel),
  updateQuery: updateQuery(usuarioModel, personaModel),
  deleteQuery: deleteQuery(usuarioModel, personaModel),
};
