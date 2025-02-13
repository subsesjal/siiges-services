const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ESTATUS_SOLICITUDES_SERVICIO_SOCIAL_TABLE } = require('../models/estatusSolicitudesServicioSocial');

const estatusSolicitudesServicioSocialCSV = path.join(__dirname, '../CSVFiles/ejes_servicio_social.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estatusSolicitudesServicioSocialJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estatusSolicitudesServicioSocialCSV);

    return queryInterface
      .bulkInsert(
        ESTATUS_SOLICITUDES_SERVICIO_SOCIAL_TABLE,
        estatusSolicitudesServicioSocialJson,
        {},
      );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_SOLICITUDES_SERVICIO_SOCIAL_TABLE, null, {});
  },
};
