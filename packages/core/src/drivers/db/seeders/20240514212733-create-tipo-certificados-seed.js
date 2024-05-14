const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_CERTIFICADOS_TABLE } = require('../models/tipoCertificados');

const tipoCertificadosCSV = path.join(__dirname, '../CSVFiles/tipo_certificados.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoCertificadosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoCertificadosCSV);

    return queryInterface.bulkInsert(TIPO_CERTIFICADOS_TABLE, tipoCertificadosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_CERTIFICADOS_TABLE, null, {});
  },
};
