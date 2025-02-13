const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ESTATUS_SOLICITUD_SERVICIO_SOCIAL_TABLE } = require('../models/estatusSolicitudServicioSocial');

const estatusSolicitudServicioSocialCSV = path.join(__dirname, '../CSVFiles/estatus_solicitudes_servicio_social.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estatusSolicitudServicioSocialJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estatusSolicitudServicioSocialCSV);

    return queryInterface
      .bulkInsert(
        ESTATUS_SOLICITUD_SERVICIO_SOCIAL_TABLE,
        estatusSolicitudServicioSocialJson,
        {},
      );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_SOLICITUD_SERVICIO_SOCIAL_TABLE, null, {});
  },
};
