const errorHandler = require('./errorHandler');

async function getUsuarios(req, reply) {
	try {

		req.log.info('[http-server]: Getting usuarios list: ');

		const usuarios = await this.usuarioServices.getUsuarios();

		return reply
			.code(200)
			.header('Content-Type', 'application/json; charset=utf-8')
			.send({ data: usuarios });
	} catch (error) {
		return errorHandler(error, reply);
	}
}

module.exports = getUsuarios;
