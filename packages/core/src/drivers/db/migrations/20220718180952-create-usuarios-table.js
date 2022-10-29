const { CICLO_TABLE, CicloSchema } = require('../models/ciclo');
const { DOMICILIO_TABLE, DomicilioSchema } = require('../models/domicilio');
const { DILIGENCIA_TABLE, DiligenciaSchema } = require('../models/diligencia');
const { ESTATUS_SOLICITUD_TABLE, EstatusSolicitudSchema } = require('../models/estatusSolicitud');
const { ESTADO_TABLE, EstadoSchema } = require('../models/estado');
const { FILE_TABLE, FileSchema } = require('../models/file');
const { INSTITUCION_TABLE, InstitucionSchema } = require('../models/institucion');
const { MODALIDAD_TABLE, ModalidadSchema } = require('../models/modalidad');
const { MUNICIPIO_TABLE, MunicipioSchema } = require('../models/municipio');
const { NIVEL_TABLE, NivelSchema } = require('../models/nivel');
const { PAIS_TABLE, PaisSchema } = require('../models/pais');
const { PERSONA_TABLE, PersonaSchema } = require('../models/persona');
const { PLANTEL_TABLE, PlantelSchema } = require('../models/plantel');
const { PROGRAMA_TABLE, ProgramaSchema } = require('../models/programa');
const { RATIFICACION_NOMBRE_TABLE, RatificacionNombreSchema } = require('../models/ratificacionNombre');
const { REPRESENTANTE_TABLE, RepresentanteSchema } = require('../models/representante');
const { ROL_TABLE, RolSchema } = require('../models/rol');
const { SOLICITUD_TABLE, SolicitudSchema } = require('../models/solicitud');
const { TIPO_INMUEBLE_TABLE, TipoInmuebleSchema } = require('../models/tipoInmueble');
const { TIPO_SOLICITUD_TABLE, TipoSolicitudSchema } = require('../models/tipoSolicitud');
const { USUARIO_TABLE, UsuarioSchema } = require('../models/usuario');
const { USUARIO_USUARIO_TABLE, UsuarioUsuarioSchema } = require('../models/usuarioUsuario');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ROL_TABLE, RolSchema);
    await queryInterface.createTable(PAIS_TABLE, PaisSchema);
    await queryInterface.createTable(ESTADO_TABLE, EstadoSchema);
    await queryInterface.createTable(MUNICIPIO_TABLE, MunicipioSchema);
    await queryInterface.createTable(DOMICILIO_TABLE, DomicilioSchema);
    await queryInterface.createTable(PERSONA_TABLE, PersonaSchema);
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
    await queryInterface.createTable(REPRESENTANTE_TABLE, RepresentanteSchema);
    await queryInterface.createTable(FILE_TABLE, FileSchema);
    await queryInterface.createTable(INSTITUCION_TABLE, InstitucionSchema);
    await queryInterface.createTable(TIPO_INMUEBLE_TABLE, TipoInmuebleSchema);
    await queryInterface.createTable(PLANTEL_TABLE, PlantelSchema);
    await queryInterface.createTable(RATIFICACION_NOMBRE_TABLE, RatificacionNombreSchema);
    await queryInterface.createTable(ESTATUS_SOLICITUD_TABLE, EstatusSolicitudSchema);
    await queryInterface.createTable(TIPO_SOLICITUD_TABLE, TipoSolicitudSchema);
    await queryInterface.createTable(SOLICITUD_TABLE, SolicitudSchema);
    await queryInterface.createTable(DILIGENCIA_TABLE, DiligenciaSchema);
    await queryInterface.createTable(CICLO_TABLE, CicloSchema);
    await queryInterface.createTable(MODALIDAD_TABLE, ModalidadSchema);
    await queryInterface.createTable(NIVEL_TABLE, NivelSchema);
    await queryInterface.createTable(PROGRAMA_TABLE, ProgramaSchema);
    await queryInterface.createTable(USUARIO_USUARIO_TABLE, UsuarioUsuarioSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ROL_TABLE);
    await queryInterface.dropTable(PAIS_TABLE);
    await queryInterface.dropTable(ESTADO_TABLE);
    await queryInterface.dropTable(MUNICIPIO_TABLE);
    await queryInterface.dropTable(DOMICILIO_TABLE);
    await queryInterface.dropTable(PERSONA_TABLE);
    await queryInterface.dropTable(USUARIO_TABLE);
    await queryInterface.dropTable(REPRESENTANTE_TABLE);
    await queryInterface.dropTable(FILE_TABLE);
    await queryInterface.dropTable(INSTITUCION_TABLE);
    await queryInterface.dropTable(TIPO_INMUEBLE_TABLE);
    await queryInterface.dropTable(PLANTEL_TABLE);
    await queryInterface.dropTable(RATIFICACION_NOMBRE_TABLE);
    await queryInterface.dropTable(ESTATUS_SOLICITUD_TABLE);
    await queryInterface.dropTable(TIPO_SOLICITUD_TABLE);
    await queryInterface.dropTable(SOLICITUD_TABLE);
    await queryInterface.dropTable(DILIGENCIA_TABLE);
    await queryInterface.dropTable(CICLO_TABLE);
    await queryInterface.dropTable(MODALIDAD_TABLE);
    await queryInterface.dropTable(NIVEL_TABLE);
    await queryInterface.dropTable(PROGRAMA_TABLE);
    await queryInterface.dropTable(USUARIO_USUARIO_TABLE);
  },
};
