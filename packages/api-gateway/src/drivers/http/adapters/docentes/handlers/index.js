const createDocente = require('./create.handlers.docente.adapters');
const findOneDocente = require('./find-one.handlers.docente.adapters');
const updateDocente = require('./update.handlers.docente.adapters');
const findGroupDocentesPrograma = require('./find-group.handlers.docentes-programa.adapters');

module.exports = {
  createDocente,
  findOneDocente,
  updateDocente,
  findGroupDocentesPrograma,
};
