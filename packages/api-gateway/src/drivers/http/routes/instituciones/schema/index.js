const getAllInstitucionesSchema = require('./getAllInstitucionesSchema');
const createInstitucionSchema = require('./createIntitucionSchema');
const getInstitucionSchema = require('./getInstitucionSchema');
const updateInstitucionSchema = require('./updateInstitucionSchema');
const deleteInstitucionSchema = require('./deleteInstitucionSchema');
const createPlantelInstitucionSchema = require('./createPlantelIntitucionSchema');
/* const getUsuarioDetalleSchema = require('./getUsuarioDetalleSchema');
 */

module.exports = {
  getAllInstitucionesSchema,
  getInstitucionSchema,
  createInstitucionSchema,
  updateInstitucionSchema,
  deleteInstitucionSchema,
  createPlantelInstitucionSchema,
  /* getUsuarioSchema,
  getUsuarioDetalleSchema,
  deleteUsuarioSchema, */
};
