const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { TIPO_INMUEBLE_TABLE } = require('../models/tipoInmueble');

const tipoInmueblesCSV = path.join(__dirname, '../CSVFiles/tipo_inmuebles.csv');

module.exports = {
  async up(queryInterface) {
    const tipoInmueblesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoInmueblesCSV);

    await queryInterface.bulkInsert(TIPO_INMUEBLE_TABLE, tipoInmueblesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_INMUEBLE_TABLE, null, {});
  },
};
