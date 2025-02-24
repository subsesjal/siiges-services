/* eslint-disable no-param-reassign */
const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { PAIS_TABLE } = require('../../models/pais');

const paisesCSV = path.join(__dirname, '../../CSVFiles/paises.csv');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    const paisesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(paisesCSV);

    return queryInterface.bulkInsert(PAIS_TABLE, paisesJson, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(PAIS_TABLE, null, {});
  },
};
