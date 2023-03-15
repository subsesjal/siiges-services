const {
  createSolicitudPrograma,
  findAllSolicitudesProgramas,
  findOneSolicitudPrograma,
  findSolicitudesUsuario,
  updateSolicitudPrograma,
} = require('./db/solicitudes');

const {
  createDiligencia,
  findDiligenciasSolicitud,
  findOneDiligencia,
  updateDiligencia,
  deleteDiligencia,
} = require('./db/diligencias');

const { createAsignaturaPrograma, findOneAsignatura } = require('./db/asignaturas');

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
  updateSolicitudPrograma,
  findOneAsignatura,
};
