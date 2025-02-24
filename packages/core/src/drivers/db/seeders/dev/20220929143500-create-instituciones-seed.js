const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { INSTITUCION_TABLE } = require('../../models/institucion');

const institucionesCSV = path.join(__dirname, '../../CSVFiles/instituciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const institucionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(institucionesCSV);

    return queryInterface.bulkInsert(INSTITUCION_TABLE, institucionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSTITUCION_TABLE, null, {});
  },
};
