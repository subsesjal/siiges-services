// Drivers
//const { drivers } = require('@siiges-services/core');
//const sequalize = require('../drivers/mysql/connection');

// Domains
const getByIdQuery = require('./getById');
const createUsuario = require('./create');
const updateUsuario = require('./update');
const removeUsuario = require('./delete');
const listUsuarios = require('./list');

// define the target model
//const usuarioModel = sequalize.model('Usuario');

module.exports = {
	getByIdQuery: getByIdQuery(),
	/* create: createUsuario(usuarioModel),
	update: updateUsuario(usuarioModel),
	remove: removeUsuario(usuarioModel),
	list: listUsuarios(usuarioModel), */
};
