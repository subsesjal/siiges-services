const { alumnos } = require('../../../adapters/db');

const createAlumno = require('./create.alumnos.use-cases');

module.exports = {
  createAlumno: createAlumno(
    alumnos.createAlumnoQuery,
  ),
};
