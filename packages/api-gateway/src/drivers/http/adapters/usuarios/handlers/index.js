const findOne = require('./find-one.handlers.usuarios.adapters');
const findOneDetail = require('./find-one.handlers.usuarios-detail.adapters');
const findAll = require('./find-all.handlers.usuarios.adapters');
const create = require('./create.handlers.usuarios.adapters');
const update = require('./update.handlers.usuarios.adapters');
const deleteOne = require('./delete.handlers.usuarios.adapters');

module.exports = {
  findOne,
  findOneDetail,
  findAll,
  create,
  update,
  deleteOne,
};
