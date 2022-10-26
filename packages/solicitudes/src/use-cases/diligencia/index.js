const { diligencia } = require('../../adapters');
const findOne = require('./find-one.diligencia.use-cases');
const create = require('./create.diligencia.use-cases');

module.exports = {
  create: create(diligencia.create),
  findOne: findOne(diligencia.findOne),
};
