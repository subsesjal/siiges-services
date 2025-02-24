const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ESTATUS_VIGILANCIA_TABLE } = require('../../models/estatusVigilancia');

const estatusVigilanciasCSV = path.join(__dirname, '../../CSVFiles/estatus_vigilancias.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estatusVigilanciasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estatusVigilanciasCSV);

    return queryInterface.bulkInsert(ESTATUS_VIGILANCIA_TABLE, estatusVigilanciasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_VIGILANCIA_TABLE, null, {});
  },
};
