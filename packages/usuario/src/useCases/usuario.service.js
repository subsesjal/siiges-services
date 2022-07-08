const boom = require('@hapi/boom');

let usuarios = [
	{ id: 1, persona_id: 1, rol_id: 2, usuario: 'admin', estatus: 1 },
	{ id: 2, persona_id: 2, rol_id: 2, usuario: 'admin2', estatus: 1 },
];

async function getUsuarioById(data) {

	const id = data;
	// model user
	
	// validacion
	/* 
		longitud
		string
		not null
	*/

	// consulta la entidad

	/* usuario = {
		id,
		persona_id: 1,
		rol_id: 2,
		usuario: 'admin',
		estatus: 1,
	}; */

	const usuario = usuarios.find((usuario) => {
		console.log(id);
		console.log(usuario);
		usuario.id == id;
	});
/* 	console.log(id);
	console.log(usuario);
 */
	if (usuario === null) {
		return boom.notFound('Usuario no encontrado');
	}

	return usuario;
}

async function getUsuarios(data) {
	// model user

	if (usuarios.lenght > 0) {
		return boom.notFound('Usuarios no encontrados');
	}

	return usuarios;
}

module.exports = {
	getUsuarioById,
	getUsuarios,
};
