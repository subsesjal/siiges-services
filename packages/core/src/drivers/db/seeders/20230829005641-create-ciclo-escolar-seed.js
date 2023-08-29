const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { CICLOESCOLAR_TABLE } = require('../models/cicloEscolar');

const cicloEscolarCSV = path.join(__dirname, '../CSVFiles/ciclos_escolares.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const cicloEscolarJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(cicloEscolarCSV);

    return queryInterface.bulkInsert(CICLOESCOLAR_TABLE, cicloEscolarJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CICLOESCOLAR_TABLE, null, {});
  },
};
