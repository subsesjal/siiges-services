const { diligencias } = require('../../../adapters/db');
const create = require('./create.diligencia.use-cases');
const deleteOne = require('./delete.diligencia.use-cases');
const findOne = require('./find-one.diligencia.use-cases');
const findGroup = require('./find-group.diligencia.use-cases');
const update = require('./update.diligencia.use-cases');

module.exports = {
  createDiligencia: create(diligencias.createQuery),
  deleteDiligencia: deleteOne(diligencias.deleteQuery),
  findOneDiligencia: findOne(diligencias.findOneQuery),
  findDiligenciasSolicitud: findGroup(diligencias.findAllQuery),
  updateDiligencia: update(diligencias.updateQuery),
};
