const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  findOneQuery,
  updateAndFindQuery,
} = queries;

const {
  Validaciones,
  Alumno,
  Usuario,
  Estado,
  Nivel,
  SituacionesValidacion,
  TipoValidaciones,
} = models;

module.exports = {
  findOneValidacionesQuery: findOneQuery(Validaciones),
  findOneAlumnoQuery: findOneQuery(Alumno),
  findOneUsuarioQuery: findOneQuery(Usuario),
  findOneEstadoQuery: findOneQuery(Estado),
  findOneNivelQuery: findOneQuery(Nivel),
  findOneSituacionesValidacionQuery: findOneQuery(SituacionesValidacion),
  findOneTipoValidacionesQuery: findOneQuery(TipoValidaciones),
  createValidacionesQuery: createQuery(Validaciones),
  updateValidacionesQuery: updateAndFindQuery(Validaciones),
};
