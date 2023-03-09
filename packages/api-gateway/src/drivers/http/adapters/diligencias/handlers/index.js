const createDiligencia = require('./create.handlers.diligencia.adapters');
const deleteDiligencia = require('./delete.handlers.diligencia.adapters');
const findOneDiligencia = require('./find-one.handlers.diligencia.adapters');
const findDiligenciasBySolicitud = require('./find.handlers.diligencias-solicitud.adapters');
const updateDiligencia = require('./update.handlers.diligencia.adapters');

module.exports = {
  createDiligencia,
  deleteDiligencia,
  findOneDiligencia,
  findDiligenciasBySolicitud,
  updateDiligencia,
};
