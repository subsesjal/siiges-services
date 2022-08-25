const { UsuarioSchema, USUARIO_TABLE } = require('../models/usuario');
const { ROL_TABLE, RolSchema } = require('../models/rol');
const { DOMICILIO_TABLE, DomicilioSchema } = require('../models/domicilio');
const { PERSONA_TABLE, PersonaSchema } = require('../models/persona');
const { PAIS_TABLE, PaisSchema } = require('../models/pais');
const { ESTADO_TABLE, EstadoSchema } = require('../models/estado');
const { MUNICIPIO_TABLE, MunicipioSchema } = require('../models/municipio');
const { FILE_TABLE, FileSchema } = require('../models/file');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ROL_TABLE, RolSchema);
    await queryInterface.createTable(PAIS_TABLE, PaisSchema);
    await queryInterface.createTable(ESTADO_TABLE, EstadoSchema);
    await queryInterface.createTable(MUNICIPIO_TABLE, MunicipioSchema);
    await queryInterface.createTable(DOMICILIO_TABLE, DomicilioSchema);
    await queryInterface.createTable(PERSONA_TABLE, PersonaSchema);
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
    await queryInterface.createTable(FILE_TABLE, FileSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ROL_TABLE);
    await queryInterface.dropTable(PAIS_TABLE);
    await queryInterface.dropTable(ESTADO_TABLE);
    await queryInterface.dropTable(MUNICIPIO_TABLE);
    await queryInterface.dropTable(DOMICILIO_TABLE);
    await queryInterface.dropTable(PERSONA_TABLE);
    await queryInterface.dropTable(USUARIO_TABLE);
    await queryInterface.dropTable(FILE_TABLE);
  },
};
