const {
  createSolicitudPrograma,
  findAllSolicitudesProgramas,
  findOneSolicitudPrograma,
  findSolicitudesUsuario,
  updateSolicitudPrograma,
  setSolicitudSeccion,
} = require('./db/solicitudes');

const {
  createDiligencia,
  findDiligenciasBySolicitud,
  findOneDiligencia,
  updateDiligencia,
  deleteDiligencia,
} = require('./db/diligencias');

const {
  createAsignaturaPrograma,
  findOneAsignatura,
  deleteAsignatura,
  findProgramaAsignaturas,
} = require('./db/asignaturas');

const {
  createDocente,
  findOneDocente,
  updateDocente,
} = require('./db/docentes');

module.exports = {
  createSolicitudPrograma,
  findAllSolicitudesProgramas,
  findOneSolicitudPrograma,
  findSolicitudesUsuario,
  createDiligencia,
  findDiligenciasBySolicitud,
  findOneDiligencia,
  updateDiligencia,
  deleteDiligencia,
  createAsignaturaPrograma,
  updateSolicitudPrograma,
  findOneAsignatura,
  deleteAsignatura,
  findProgramaAsignaturas,
  createDocente,
  findOneDocente,
  updateDocente,
  setSolicitudSeccion,
};
