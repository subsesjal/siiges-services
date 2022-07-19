/**
 * @description Export all features and business rules from the package
 */

// Domains
const { findAllQuery, findOneQuery, createQuery } = require('./domains');

// Services
const { findAll, findOne, create } = require('./useCases');

// Models
const usuarioModel = require('./drivers/db/models/usuario');

module.exports = {
  methods: {
    findAll: findAll(findAllQuery),
    findOne: findOne(findOneQuery),
    create: create(createQuery),
  },
  models: {
    usuario: usuarioModel,
  },
};
