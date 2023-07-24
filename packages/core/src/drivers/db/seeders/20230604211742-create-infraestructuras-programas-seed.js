const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INFRAESTRUCTURA_PROGRAMA_TABLE } = require('../models/infraestructuraPrograma');

const infraestructurasProgramasCSV = path.join(__dirname, '../CSVFiles/infraestructuras_programas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const infraestructurasProgramasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(infraestructurasProgramasCSV);

    return queryInterface.bulkInsert(
      INFRAESTRUCTURA_PROGRAMA_TABLE,
      infraestructurasProgramasJson,
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INFRAESTRUCTURA_PROGRAMA_TABLE, null, {});
  },
};
