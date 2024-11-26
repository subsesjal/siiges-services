const createEquivalencia = require('./create.handlers.equivalencias.adapters');
const findOneEquivalencia = require('./find-one.handlers.equivalencias');
const findAllEquivalencias = require('./find-all.handlers.equivalencias.adapters');
const deleteEquivalencia = require('./delete.handlers.equivalencias.adapters');
const updateEquivalencia = require('./update.handlers.equivalencias.adapters');

module.exports = {
  createEquivalencia,
  findOneEquivalencia,
  findAllEquivalencias,
  deleteEquivalencia,
  updateEquivalencia,
};
