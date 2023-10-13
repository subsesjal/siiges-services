const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { SALUD_INSTITUCION_TABLE } = require('../models/saludInstitucion');

const saludInstitucionesCSV = path.join(__dirname, '../CSVFiles/salud_instituciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const saludInstitucionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(saludInstitucionesCSV);

    return queryInterface.bulkInsert(SALUD_INSTITUCION_TABLE, saludInstitucionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SALUD_INSTITUCION_TABLE, null, {});
  },
};
