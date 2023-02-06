const { representantes } = require('../../../../adapters/db');
const create = require('./create.representante.use-cases');
const deleteOne = require('./delete.representante.use-cases');
const findOne = require('./find-one.representante.use-cases');
const update = require('./update.representante.use-cases');

module.exports = {
  create: create(representantes.create),
  deleteOne: deleteOne(representantes.delete),
  findOne: findOne(representantes.findOne),
  update: update(representantes.update),
};
