const { diligencia } = require('../../adapters');
const findOne = require('./find-one.diligencia.use-cases');
const update = require('./update.diligencia.use-cases');

module.exports = {
  findOne: findOne(diligencia.findOne),
  update: update(diligencia.update),
};
