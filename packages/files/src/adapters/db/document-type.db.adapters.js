const { tipoDocumentoObj } = require('../../utils/constants');
const findItemInObj = require('../../utils/find-item-obj.utils');

module.exports = {
  findOneQueryDocumentType: findItemInObj(tipoDocumentoObj),
};
