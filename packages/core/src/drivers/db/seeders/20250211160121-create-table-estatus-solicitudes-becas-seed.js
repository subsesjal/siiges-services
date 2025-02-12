const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ESTATUS_SOLICITUD_BECA_TABLE } = require('../models/estatusSolicitudesBecas');

const estatusSolicitudBecaCSV = path.join(__dirname, '../CSVFiles/estatus_solicitudes_becas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estatusSolicitudBecaJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estatusSolicitudBecaCSV);

    return queryInterface
      .bulkInsert(ESTATUS_SOLICITUD_BECA_TABLE, estatusSolicitudBecaJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_SOLICITUD_BECA_TABLE, null, {});
  },
};
