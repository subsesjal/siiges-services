const {
  asignatura,
} = require('../../../adapters/db');

const findOneAsignatura = require('./find.one.asignatura.use-cases');

module.exports = {
  findOneAsignatura: findOneAsignatura(
    asignatura.findOneAsignaturaQuery,
  ),
};
