const { createAlumnoValidacion } = require('./create.handlers.validacion.adapters');
const { findOneAlumnoValidacion } = require('./find-one.handlers.validacion.adapters');
const { updateAlumnoValidacion } = require('./update.handlers.validacion.adapters');

module.exports = {
  createAlumnoValidacion,
  findOneAlumnoValidacion,
  updateAlumnoValidacion,
};
