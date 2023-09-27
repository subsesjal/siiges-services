const { createFormacionRectorSchema } = require('./create.formacion-rector.schema');
const { updateFormacionRectorSchema } = require('./update.formacion-rector.schema');
const { findAllFormacionRectorSchema } = require('./find-all.formacion-rector.schema');
const { findOneFormacionRectorSchema } = require('./find-one.formacion-rector.schema');

module.exports = {
  createFormacionRectorSchema,
  updateFormacionRectorSchema,
  findAllFormacionRectorSchema,
  findOneFormacionRectorSchema,
};
