const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_SOLICITUD_TABLE } = require('../../models/tipoSolicitud');

const tipoSolicitudesCSV = path.join(__dirname, '../../CSVFiles/tipo_solicitudes.csv');

const NUEVOS_TIPO_SOLICITUD_IDS = ['4', '5', '6'];

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoSolicitudesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoSolicitudesCSV);

    const nuevosTipos = tipoSolicitudesJson
      .filter(({ id }) => NUEVOS_TIPO_SOLICITUD_IDS.includes(id));

    return queryInterface.bulkInsert(TIPO_SOLICITUD_TABLE, nuevosTipos, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_SOLICITUD_TABLE, { id: NUEVOS_TIPO_SOLICITUD_IDS }, {});
  },
};
