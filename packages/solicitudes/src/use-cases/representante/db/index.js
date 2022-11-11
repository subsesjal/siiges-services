const { representante } = require('../../../adapters');
const create = require('./create.representante.use-cases');
const deleteOne = require('./delete.representante.use-cases');
const findOne = require('./find-one.representante.use-cases');
const update = require('./update.representante.use-cases');

module.exports = {
  create: create(representante.create),
  deleteOne: deleteOne(representante.delete),
  findOne: findOne(representante.findOne),
  update: update(representante.update),
};
