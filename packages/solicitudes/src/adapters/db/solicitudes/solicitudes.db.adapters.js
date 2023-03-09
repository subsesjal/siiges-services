// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Solicitud,
  Nivel,
  Usuario,
  ProgramaTurno,
} = models;

const {
  findAllQuery,
  findOneQuery,
  createQuery,
  updateAndFindQuery,
  countQuery,
} = queries;

module.exports = {
  createSolicitudProgramaQuery: createQuery(Solicitud),
  updateAndFindSolicitudQuery: updateAndFindQuery(Solicitud),
  findOneSolicitudQuery: findOneQuery(Solicitud),
  findOneNivelQuery: findOneQuery(Nivel),
  findOneUsuarioQuery: findOneQuery(Usuario),
  countSolicitudesQuery: countQuery(Solicitud),
  findAllSolicitudesProgramasQuery: findAllQuery(Solicitud),
  findOneSolicitudProgramaQuery: findOneQuery(Solicitud),
  findAllSolicitudesUsuarioQuery: findAllQuery(Solicitud),
  createProgramaTurnoQuery: createQuery(ProgramaTurno),
};
