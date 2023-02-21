const { diligencia } = require('../../../adapters/db');
const create = require('./create.diligencia.use-cases');
const deleteOne = require('./delete.diligencia.use-cases');
const findOne = require('./find-one.diligencia.use-cases');
const findGroup = require('./find-group.diligencia.use-cases');
const update = require('./update.diligencia.use-cases');

module.exports = {
  create: create(diligencia.create),
  deleteOne: deleteOne(diligencia.delete),
  findOne: findOne(diligencia.findOne),
  findGroup: findGroup(diligencia.findAll),
  update: update(diligencia.update),
};
