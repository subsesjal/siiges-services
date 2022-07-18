const { Usuario, UsuarioSchema } = require('./usuario');

function setupModels(sequelize) {
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
}

module.exports = setupModels;
