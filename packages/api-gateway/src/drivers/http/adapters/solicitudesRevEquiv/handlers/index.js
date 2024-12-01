const createEquivalencia = require('./create.handlers.solicitud-rev-equiv.adapters');
const findOneEquivalencia = require('./find-one.handlers.solicitud-rev-equiv.adapters');
const findAllEquivalencias = require('./find-all.handlers.solicitudes-rev-equiv.adapters');
const deleteEquivalencia = require('./delete.handlers.solicitud-rev-equiv.adapters');
const updateEquivalencia = require('./update.handlers.solicitud-rev-equiv.adapters');

module.exports = {
  createEquivalencia,
  findOneEquivalencia,
  findAllEquivalencias,
  deleteEquivalencia,
  updateEquivalencia,
};
