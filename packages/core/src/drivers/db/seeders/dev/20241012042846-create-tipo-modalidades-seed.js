const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_MODALIDAD_TABLE } = require('../../models/tipoModalidad');

const tipoModalidadCSV = path.join(__dirname, '../../CSVFiles/tipo_modalidades.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoModalidadJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoModalidadCSV);

    return queryInterface
      .bulkInsert(TIPO_MODALIDAD_TABLE, tipoModalidadJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_MODALIDAD_TABLE, null, {});
  },
};
