const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_SOLICITUD_BECA_TABLE  } = require('../models/tipoSolicitudesBecas');

const tiposSolicitudesBecasCSV = path.join(__dirname, '../CSVFiles/estatus_alumnos_becas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tiposSolicitudesBecasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tiposSolicitudesBecasCSV);

    return queryInterface
      .bulkInsert(TIPO_SOLICITUD_BECA_TABLE, tiposSolicitudesBecasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_SOLICITUD_BECA_TABLE, null, {});
  },
};
