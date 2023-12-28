const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { VIGILANTE_VIGILANCIA_TABLE } = require('../models/vigilanteVigilancia');

const vigilantesVigilanciasCSV = path.join(__dirname, '../CSVFiles/vigilantes_vigilancias.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const vigilantesVigilanciasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(vigilantesVigilanciasCSV);

    return queryInterface.bulkInsert(VIGILANTE_VIGILANCIA_TABLE, vigilantesVigilanciasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(VIGILANTE_VIGILANCIA_TABLE, null, {});
  },
};
