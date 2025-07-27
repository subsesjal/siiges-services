const { models, queries } = require('@siiges-services/core');

const {
  Alumno,
  TituloElectronico,
  AlumnoTituloElectronico,
  File,
} = models;

const {
  findOneQuery,
  createQuery,
} = queries;

module.exports = {
  findOneAlumnoQuery: findOneQuery(Alumno),
  createTituloElectronicoQuery: createQuery(TituloElectronico),
  findOneTituloElectronicoQuery: findOneQuery(TituloElectronico),
  createAlumnoTituloElectronicoQuery: createQuery(AlumnoTituloElectronico),
  findOneAlumnoTituloElectronicoQuery: findOneQuery(AlumnoTituloElectronico),
  findOneFileQuery: findOneQuery(File),
};
