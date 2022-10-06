const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INSTITUCION_TABLE } = require('../models/institucion');

const institucionesCSV = path.join(__dirname, '../CSVFiles/instituciones.csv');

module.exports = {
  async up(queryInterface) {
    const institucionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(institucionesCSV);

    await queryInterface.bulkInsert(INSTITUCION_TABLE, institucionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSTITUCION_TABLE, null, {});
  },
};
