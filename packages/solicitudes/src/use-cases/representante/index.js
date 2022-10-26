const { representante } = require('../../adapters');
const findOne = require('./find-one.representante.use-cases');
const update = require('./update.representante.use-cases');

module.exports = {
  findOne: findOne(representante.findOne),
  update: update(representante.update),
};
