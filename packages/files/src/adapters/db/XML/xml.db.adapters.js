// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Alumno,
  TituloElectronico,
  AlumnoTituloElectronico,
} = models;

const {
  findOneQuery,
  createQuery,
} = queries;

module.exports = {
  findOneAlumnoQuery: findOneQuery(Alumno),
  createTituloElectronicoQuery: createQuery(TituloElectronico),
  createAlumnoTituloElectronicoQuery: createQuery(AlumnoTituloElectronico),
  findOneAlumnoTituloElectronicoQuery: findOneQuery(AlumnoTituloElectronico),
};
