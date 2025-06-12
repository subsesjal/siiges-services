const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { AUTORIZACION_RECONOCIMIENTO_TABLE } = require('../../models/autorizacionReconocimiento');

const autorizacionesCSV = path.join(__dirname, '../../CSVFiles/autorizaciones_reconocimiento.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const autorizacionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(autorizacionesCSV);

    return queryInterface.bulkInsert(AUTORIZACION_RECONOCIMIENTO_TABLE, autorizacionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(AUTORIZACION_RECONOCIMIENTO_TABLE, null, {});
  },
};
