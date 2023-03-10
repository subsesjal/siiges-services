const {
  createSolicitudPrograma,
  findAllSolicitudesProgramas,
  findOneSolicitudPrograma,
  findSolicitudesUsuario,
} = require('./db/solicitudes');

const {
  createDiligencia,
  findDiligenciasSolicitud,
  findOneDiligencia,
  updateDiligencia,
  deleteDiligencia,
} = require('./db/diligencias');

module.exports = {
  createSolicitudPrograma,
  findAllSolicitudesProgramas,
  findOneSolicitudPrograma,
  findSolicitudesUsuario,
  createDiligencia,
  findDiligenciasSolicitud,
  findOneDiligencia,
  updateDiligencia,
  deleteDiligencia,
};
