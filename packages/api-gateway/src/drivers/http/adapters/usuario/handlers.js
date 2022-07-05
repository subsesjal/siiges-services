function errorHandler(error, reply) {
	if (error.isBoom) {
		return reply
			.code(error.output.payload.statusCode)
			.send(error.output.payload);
	}

  return reply.code(500).send({error: error.message, stack: error.stack})
}
