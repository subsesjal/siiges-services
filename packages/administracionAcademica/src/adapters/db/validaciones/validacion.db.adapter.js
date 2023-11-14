const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  findOneQuery,
  updateAndFindQuery,
} = queries;

const {
  Alumno,
  Usuario,
  Estado,
  Nivel,
  SituacionesValidacion,
  TipoValidaciones,
  Validacion,
} = models;

module.exports = {
  findOneValidacionQuery: findOneQuery(Validacion),
  findOneAlumnoQuery: findOneQuery(Alumno),
  findOneUsuarioQuery: findOneQuery(Usuario),
  findOneEstadoQuery: findOneQuery(Estado),
  findOneNivelQuery: findOneQuery(Nivel),
  findOneSituacionesValidacionQuery: findOneQuery(SituacionesValidacion),
  findOneTipoValidacionesQuery: findOneQuery(TipoValidaciones),
  createValidacionesQuery: createQuery(Validacion),
  updateValidacionesQuery: updateAndFindQuery(Validacion),
};
