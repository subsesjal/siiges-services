const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { CICLO_ESCOLAR_TABLE } = require('../models/cicloEscolar');

const ciclosEscolaresCSV = path.join(__dirname, '../CSVFiles/ciclos_escolares.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const ciclosEscolaresJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(ciclosEscolaresCSV);

    return queryInterface.bulkInsert(CICLO_ESCOLAR_TABLE, ciclosEscolaresJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CICLO_ESCOLAR_TABLE, null, {});
  },
};
