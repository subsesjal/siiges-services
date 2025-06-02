const { alumnos } = require('../../../adapters/db');

const createAlumnos = require('./create.alumnos.use-cases');

module.exports = {
  createAlumnos: createAlumnos(
    alumnos.findOneUserUsersQuery,
    alumnos.findOneProgramaQuery,
    alumnos.findOneAlumnoQuery,
    alumnos.createAlumnoQuery,
  ),
};
