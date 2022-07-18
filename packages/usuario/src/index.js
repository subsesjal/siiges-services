/**
 * @description Export all features and business rules from the package
 */

// Domains
const { findQuery, findOneQuery, createQuery } = require('./domains');

// Services
const { find, findOne, create } = require('./useCases');

// Models
const usuarioModel = require('./drivers/db/models/usuario');

module.exports = {
  methods: {
    find: find(findQuery),
    findOne: findOne(findOneQuery),
    create: create(createQuery),
  },
  models: {
    usuario: usuarioModel,
  },
};
