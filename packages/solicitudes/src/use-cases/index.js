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

const {
  createAsignaturaPrograma,
  findOneAsignatura,
  deleteAsignatura,
} = require('./db/asignaturas');

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
  createAsignaturaPrograma,
  findOneAsignatura,
  deleteAsignatura,
};
