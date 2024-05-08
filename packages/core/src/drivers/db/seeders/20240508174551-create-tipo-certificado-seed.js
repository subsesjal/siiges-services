const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_CERTIFICADO_TABLE } = require('../models/tipoCertificado');

const situacionesValidacion = path.join(__dirname, '../CSVFiles/tipo_certificado.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoCertificadoJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(situacionesValidacion);

    return queryInterface.bulkInsert(TIPO_CERTIFICADO_TABLE, tipoCertificadoJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_CERTIFICADO_TABLE, null, {});
  },
};
