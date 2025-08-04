// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudRevEquiv,
  AsignaturaAntecedenteEquivalente,
  AsignaturaEquivalentePrograma,
  InstitucionDestinoPrograma,
  Asignatura,
  Alumno,
  CicloEscolar,
  Grupo,
  AlumnoGrupo,
  Calificacion,
  Equivalencia,
} = models;

const {
  findAllQuery,
  findOneQuery,
  createQuery,
  updateAndFindQuery,
  deleteQuery,
  countQuery,
} = queries;

module.exports = {
  createSolicitudRevEquivQuery: createQuery(SolicitudRevEquiv),
  createAsignaturaAntecedenteEquivalente: createQuery(AsignaturaAntecedenteEquivalente),
  createAsignaturaEquivalenteProgramaQuery: createQuery(AsignaturaEquivalentePrograma),
  createInstitucionDestinoProgramaQuery: createQuery(InstitucionDestinoPrograma),
  findOneSolicitudRevEquivQuery: findOneQuery(SolicitudRevEquiv),
  findAllSolicitudesRevEquivQuery: findAllQuery(SolicitudRevEquiv),
  deleteSolicitudRevEquivQuery: deleteQuery(SolicitudRevEquiv),
  updateSolicitudRevEquivQuery: updateAndFindQuery(SolicitudRevEquiv),
  findOneAsignaturaQuery: findOneQuery(Asignatura),
  findOneAsignaturaAntecedenteEquivalenteQuery: findOneQuery(AsignaturaAntecedenteEquivalente),
  countSolicitudRevEquivQuery: countQuery(SolicitudRevEquiv),
  findOneAlumnoQuery: findOneQuery(Alumno),
  createAlumnoQuery: createQuery(Alumno),
  findOneCicloEscolarQuery: findOneQuery(CicloEscolar),
  createCicloEscolarQuery: createQuery(CicloEscolar),
  findOneGrupoQuery: findOneQuery(Grupo),
  createGrupoQuery: createQuery(Grupo),
  findOneAlumnoGrupoQuery: findOneQuery(AlumnoGrupo),
  createAlumnoGrupoQuery: createQuery(AlumnoGrupo),
  createCalificacionQuery: createQuery(Calificacion),
  findOneEquivQuery: findOneQuery(Equivalencia),
  createEquiQuery: createQuery(Equivalencia),
};
