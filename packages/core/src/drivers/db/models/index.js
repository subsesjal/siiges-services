const { Usuario, UsuarioSchema } = require('./usuario');
const { Rol, RolSchema } = require('./rol');
const { Persona, PersonaSchema } = require('./persona');
const { Pais, PaisSchema } = require('./pais');
const { Estado, EstadoSchema } = require('./estado');
const { Municipio, MunicipioSchema } = require('./municipio');
const { Domicilio, DomicilioSchema } = require('./domicilio');
const { File, FileSchema } = require('./file');

function setupModels(sequelize) {
  Rol.init(RolSchema, Rol.config(sequelize));
  Pais.init(PaisSchema, Pais.config(sequelize));
  Estado.init(EstadoSchema, Estado.config(sequelize));
  Municipio.init(MunicipioSchema, Municipio.config(sequelize));
  Domicilio.init(DomicilioSchema, Domicilio.config(sequelize));
  Persona.init(PersonaSchema, Persona.config(sequelize));
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  File.init(FileSchema, File.config(sequelize));

  Rol.associate(sequelize.models);
  Pais.associate(sequelize.models);
  Estado.associate(sequelize.models);
  Municipio.associate(sequelize.models);
  Domicilio.associate(sequelize.models);
  Persona.associate(sequelize.models);
  Usuario.associate(sequelize.models);
  File.associate(sequelize.models);
}

module.exports = setupModels;
