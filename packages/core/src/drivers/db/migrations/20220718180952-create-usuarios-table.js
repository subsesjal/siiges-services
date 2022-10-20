const { UsuarioSchema, USUARIO_TABLE } = require('../models/usuario');
const { ROL_TABLE, RolSchema } = require('../models/rol');
const { DOMICILIO_TABLE, DomicilioSchema } = require('../models/domicilio');
const { PERSONA_TABLE, PersonaSchema } = require('../models/persona');
const { PAIS_TABLE, PaisSchema } = require('../models/pais');
const { ESTADO_TABLE, EstadoSchema } = require('../models/estado');
const { MUNICIPIO_TABLE, MunicipioSchema } = require('../models/municipio');
const { FILE_TABLE, FileSchema } = require('../models/file');
const { INSTITUCION_TABLE, InstitucionSchema } = require('../models/institucion');
const { TIPO_INMUEBLE_TABLE, TipoInmuebleSchema } = require('../models/tipoInmueble');
const { PLANTEL_TABLE, PlantelSchema } = require('../models/plantel');
const { RATIFICACION_NOMBRE_TABLE, RatificacionNombreSchema } = require('../models/ratificacionNombre');
const { ESTATUS_SOLICITUD_TABLE, EstatusSolicitudSchema } = require('../models/estatusSolicitud');
const { TIPO_SOLICITUD_TABLE, TipoSolicitudSchema } = require('../models/tipoSolicitud');
const { SOLICITUD_TABLE, SolicitudSchema } = require('../models/solicitud');

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
    await queryInterface.createTable(INSTITUCION_TABLE, InstitucionSchema);
    await queryInterface.createTable(TIPO_INMUEBLE_TABLE, TipoInmuebleSchema);
    await queryInterface.createTable(PLANTEL_TABLE, PlantelSchema);
    await queryInterface.createTable(RATIFICACION_NOMBRE_TABLE, RatificacionNombreSchema);
    await queryInterface.createTable(ESTATUS_SOLICITUD_TABLE, EstatusSolicitudSchema);
    await queryInterface.createTable(TIPO_SOLICITUD_TABLE, TipoSolicitudSchema);
    await queryInterface.createTable(SOLICITUD_TABLE, SolicitudSchema);
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
    await queryInterface.dropTable(INSTITUCION_TABLE);
    await queryInterface.dropTable(TIPO_INMUEBLE_TABLE);
    await queryInterface.dropTable(PLANTEL_TABLE);
    await queryInterface.dropTable(RATIFICACION_NOMBRE_TABLE);
    await queryInterface.dropTable(ESTATUS_SOLICITUD_TABLE);
    await queryInterface.dropTable(TIPO_SOLICITUD_TABLE);
    await queryInterface.dropTable(SOLICITUD_TABLE);
  },
};
