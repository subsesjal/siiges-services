// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudBeca,
  Alumno,
  Grado,
  SolicitudBecaAlumno,
} = models;

const {
  createQuery,
  countQuery,
  findOneQuery,
  updateAndFindQuery,
  findAllQuery,
  deleteAndFindQuery,
} = queries;

module.exports = {
  createSolicitudBecaQuery: createQuery(SolicitudBeca),
  findOneSolicitudBecaQuery: findOneQuery(SolicitudBeca),
  countSolicitudesBecasQuery: countQuery(SolicitudBeca),
  updateSolicitudesBecasQuery: updateAndFindQuery(SolicitudBeca),
  findAllSolicitudesBecasQuery: findAllQuery(SolicitudBeca),
  deleteSolicitudBecasQuery: deleteAndFindQuery(SolicitudBeca),
  deleteSolicitudBecasAlumnosQuery: deleteAndFindQuery(SolicitudBecaAlumno),
  createSolicitudesBecasAlumnoQuery: createQuery(SolicitudBecaAlumno),
  findOneSolicitudesBecasAlumnoQuery: findOneQuery(SolicitudBecaAlumno),
  findOneAlumnoQuery: findOneQuery(Alumno),
  findOneGradoQuery: findOneQuery(Grado),
  findAllSolicitudesBecasAlumnosQuery: findAllQuery(SolicitudBecaAlumno),
};
