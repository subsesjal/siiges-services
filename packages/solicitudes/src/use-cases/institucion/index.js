const { institucion } = require('../../adapters');
const findOne = require('./find-one.institucion.use-cases');
const update = require('./update.institucion.use-cases');

module.exports = {
  findOne: findOne(institucion.findOne),
  update: update(institucion.update),
};
