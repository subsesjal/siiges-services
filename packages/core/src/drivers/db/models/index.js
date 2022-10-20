const { Usuario, UsuarioSchema } = require('./usuario');
const { Rol, RolSchema } = require('./rol');
const { Persona, PersonaSchema } = require('./persona');
const { Pais, PaisSchema } = require('./pais');
const { Estado, EstadoSchema } = require('./estado');
const { Municipio, MunicipioSchema } = require('./municipio');
const { Domicilio, DomicilioSchema } = require('./domicilio');
const { File, FileSchema } = require('./file');
const { TipoInmueble, TipoInmuebleSchema } = require('./tipoInmueble');
const { Institucion, InstitucionSchema } = require('./institucion');
const { Plantel, PlantelSchema } = require('./plantel');
const { RatificacionNombre, RatificacionNombreSchema } = require('./ratificacionNombre');
const { TipoSolicitud, TipoSolicitudSchema } = require('./tipoSolicitud');
const { EstatusSolicitud, EstatusSolicitudSchema } = require('./estatusSolicitud');
const { Solicitud, SolicitudSchema } = require('./solicitud');

function setupModels(sequelize) {
  Rol.init(RolSchema, Rol.config(sequelize));
  Pais.init(PaisSchema, Pais.config(sequelize));
  Estado.init(EstadoSchema, Estado.config(sequelize));
  Municipio.init(MunicipioSchema, Municipio.config(sequelize));
  Domicilio.init(DomicilioSchema, Domicilio.config(sequelize));
  Persona.init(PersonaSchema, Persona.config(sequelize));
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  File.init(FileSchema, File.config(sequelize));
  Institucion.init(InstitucionSchema, Institucion.config(sequelize));
  TipoInmueble.init(TipoInmuebleSchema, TipoInmueble.config(sequelize));
  Plantel.init(PlantelSchema, Plantel.config(sequelize));
  RatificacionNombre.init(RatificacionNombreSchema, RatificacionNombre.config(sequelize));
  TipoSolicitud.init(TipoSolicitudSchema, TipoSolicitud.config(sequelize));
  EstatusSolicitud.init(EstatusSolicitudSchema, EstatusSolicitud.config(sequelize));
  Solicitud.init(SolicitudSchema, Solicitud.config(sequelize));

  Rol.associate(sequelize.models);
  Pais.associate(sequelize.models);
  Estado.associate(sequelize.models);
  Municipio.associate(sequelize.models);
  Domicilio.associate(sequelize.models);
  Persona.associate(sequelize.models);
  Usuario.associate(sequelize.models);
  File.associate(sequelize.models);
  Institucion.associate(sequelize.models);
  TipoInmueble.associate(sequelize.models);
  Plantel.associate(sequelize.models);
  RatificacionNombre.associate(sequelize.models);
  TipoSolicitud.associate(sequelize.models);
  EstatusSolicitud.associate(sequelize.models);
  Solicitud.associate(sequelize.models);
}

module.exports = setupModels;
