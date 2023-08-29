const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_INMUEBLE_TABLE } = require('../models/tipoInmueble');

const tipoInmueblesCSV = path.join(__dirname, '../CSVFiles/tipo_inmuebles.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoInmueblesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoInmueblesCSV);

    return queryInterface.bulkInsert(TIPO_INMUEBLE_TABLE, tipoInmueblesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_INMUEBLE_TABLE, null, {});
  },
};
