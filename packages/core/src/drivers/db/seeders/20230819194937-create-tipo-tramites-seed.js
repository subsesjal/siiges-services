const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_TRAMITE_TABLE } = require('../models/tipoTramite');

const tipoTramitesCSV = path.join(__dirname, '../CSVFiles/tipo_tramites.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoTramitesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoTramitesCSV);

    return queryInterface.bulkInsert(TIPO_TRAMITE_TABLE, tipoTramitesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_TRAMITE_TABLE, null, {});
  },
};
