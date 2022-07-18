function errorHandler(error, reply) {
  if (error.isBoom) {
    console.log(error);
    const { output, data } = error;
    return reply.code(output.statusCode).send({
      statusCode: output.payload.statusCode,
      error: output.payload.error,
      message: output.payload.message,
      data,
    });
  }

  return reply.code(500).send({ message: error.message, stack: error.stack });
}

module.exports = errorHandler;
