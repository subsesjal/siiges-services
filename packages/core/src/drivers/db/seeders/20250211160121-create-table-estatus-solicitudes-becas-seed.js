const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ESTATUS_SOLICITUD_BECA_TABLE  } = require('../models/estatusSolicitudesBecas');

const estatusSolicitudesBecasCSV = path.join(__dirname, '../CSVFiles/esestatus_solicitudes_becas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estatusSolicitudesBecasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estatusSolicitudesBecasCSV);

    return queryInterface
      .bulkInsert(ESTATUS_SOLICITUD_BECA_TABLE, estatusSolicitudesBecasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_SOLICITUD_BECA_TABLE, null, {});
  },
};
