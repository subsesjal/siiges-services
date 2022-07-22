// Drivers
const { drivers } = require('@siiges-services/core');

const { sequelize } = drivers;

// Domains
const {
  findAllQuery, findOneQuery, findOneDetailedQuery, createQuery,
} = require('./usuarios');

// define the target model
const usuarioModel = sequelize.model('Usuario');
const rolModel = sequelize.model('Rol');
const personaModel = sequelize.model('Persona');
const domicilioModel = sequelize.model('Domicilio');

module.exports = {
  findOneQuery: findOneQuery(usuarioModel),
  findOneDetailedQuery: findOneDetailedQuery(usuarioModel),
  findAllQuery: findAllQuery(usuarioModel),
  createQuery: createQuery(
    usuarioModel,
    rolModel,
    personaModel,
    domicilioModel,
  ),
};
