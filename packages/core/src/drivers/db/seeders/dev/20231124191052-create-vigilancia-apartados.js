const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { VIGILANCIA_APARTADO_TABLE } = require('../../models/vigilanciaApartado');

const vigilanciaApartadosCSV = path.join(__dirname, '../../CSVFiles/vigilancia_apartados.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const vigilanciaApartadosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(vigilanciaApartadosCSV);

    // eslint-disable-next-line max-len
    return queryInterface.bulkInsert(VIGILANCIA_APARTADO_TABLE, vigilanciaApartadosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(VIGILANCIA_APARTADO_TABLE, null, {});
  },
};
