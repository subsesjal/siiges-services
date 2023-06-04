const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { USUARIO_USUARIO_TABLE } = require('../models/usuarioUsuario');

const usuarioUsuariosCSV = path.join(__dirname, '../CSVFiles/usuario_usuarios.csv');

module.exports = {
  async up(queryInterface) {
    const usuarioUsuariosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(usuarioUsuariosCSV);

    await queryInterface.bulkInsert(USUARIO_USUARIO_TABLE, usuarioUsuariosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(USUARIO_USUARIO_TABLE, null, {});
  },
};
