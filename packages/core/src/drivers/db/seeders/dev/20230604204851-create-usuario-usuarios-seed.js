const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { USUARIO_USUARIO_TABLE } = require('../../models/usuarioUsuario');

const usuarioUsuariosCSV = path.join(__dirname, '../../CSVFiles/usuario_usuarios.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const usuarioUsuariosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(usuarioUsuariosCSV);

    return queryInterface.bulkInsert(USUARIO_USUARIO_TABLE, usuarioUsuariosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(USUARIO_USUARIO_TABLE, null, {});
  },
};
