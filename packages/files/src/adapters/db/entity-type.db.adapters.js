const { tipoEntidadObj } = require('../../utils/constants');
const findItemInObj = require('../../utils/find-item-obj.utils');

module.exports = {
  findOneQueryEntityType: findItemInObj(tipoEntidadObj),
};
