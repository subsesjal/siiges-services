const {
  createSolicitudPrograma,
  findAllSolicitudesProgramas,
  findOneSolicitudPrograma,
  findSolicitudesUsuario,
  updateSolicitudPrograma,
  setSolicitudSeccion,
  updateSolcitudSeccionObservacion,
  findOneSolicitudSeccion,
  findOneSolicitudDetalle,
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
  updateAsignatura,
  deleteAsignatura,
  findProgramaAsignaturas,
} = require('./db/asignaturas');

const {
  createDocente,
  findOneDocente,
  updateDocente,
  findGroupDocentesPrograma,
  deleteDocente,
} = require('./db/docentes');

const {
  createPlantelInfraestructura,
  deletePlantelInfraestructura,
  findGroupPlantelInfraestructura,
  findGroupPlantelesUsuario,
} = require('./db/planteles');

const {
  createTrayectoriaPrograma,
  findOneTrayectoriaPrograma,
  updateTrayectoriaPrograma,
} = require('./db/trayectorias');

const {
  createEvaluaciones,
  findOneEvaluaciones,
  updateEvaluaciones,
} = require('./db/evaluaciones');

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
  updateAsignatura,
  deleteAsignatura,
  findProgramaAsignaturas,
  createDocente,
  findOneDocente,
  updateDocente,
  findGroupDocentesPrograma,
  setSolicitudSeccion,
  updateSolcitudSeccionObservacion,
  deleteDocente,
  createPlantelInfraestructura,
  deletePlantelInfraestructura,
  findGroupPlantelInfraestructura,
  findGroupPlantelesUsuario,
  findOneSolicitudSeccion,
  createTrayectoriaPrograma,
  findOneTrayectoriaPrograma,
  updateTrayectoriaPrograma,
  createEvaluaciones,
  findOneEvaluaciones,
  updateEvaluaciones,
  findOneSolicitudDetalle,
};
