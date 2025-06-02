// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Alumno,
  TituloElectronico,
} = models;

const {
  findOneQuery,
  createQuery,
} = queries;

module.exports = {
  findOneAlumnoQuery: findOneQuery(Alumno),
  createTituloElectronicoQuery: createQuery(TituloElectronico),
};
