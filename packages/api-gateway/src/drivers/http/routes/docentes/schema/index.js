const createDocenteSchema = require('./create.docente.schema');
const findOneDocenteSchema = require('./find-one.docente.schema');
const updateDocenteSchema = require('./update.docente.schema');
const findGroupDocentesProgramaSchema = require('./find-group.docentes-programa.schema');

module.exports = {
  createDocenteSchema,
  findOneDocenteSchema,
  updateDocenteSchema,
  findGroupDocentesProgramaSchema,
};
