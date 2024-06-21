const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ESTATUS_CERTIFICADO_TABLE } = require('../models/estatusCertificado');

const situacionesValidacion = path.join(__dirname, '../CSVFiles/estatus_certificado.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estatusCertificadoJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(situacionesValidacion);

    return queryInterface.bulkInsert(ESTATUS_CERTIFICADO_TABLE, estatusCertificadoJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_CERTIFICADO_TABLE, null, {});
  },
};
