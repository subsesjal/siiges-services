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
  SituacionValidacion,
  TipoValidacion,
  Validacion,
} = models;

module.exports = {
  findOneValidacionQuery: findOneQuery(Validacion),
  findOneAlumnoQuery: findOneQuery(Alumno),
  findOneUsuarioQuery: findOneQuery(Usuario),
  findOneEstadoQuery: findOneQuery(Estado),
  findOneNivelQuery: findOneQuery(Nivel),
  findOneSituacionesValidacionQuery: findOneQuery(SituacionValidacion),
  findOneTipoValidacionesQuery: findOneQuery(TipoValidacion),
  createValidacionesQuery: createQuery(Validacion),
  updateValidacionesQuery: updateAndFindQuery(Validacion),
};
