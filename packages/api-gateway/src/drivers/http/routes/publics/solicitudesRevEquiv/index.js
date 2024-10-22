const solicitudesSchema = require('./schema');
const { solicitudesRevEquiv } = require('../../../adapters');

async function solicitudesRevEquivRouter(fastify, opts, next) {
  fastify.post(
    '/',
    {
      schema: solicitudesSchema.createEquivalenciaSchema,
      preValidation: async (request, reply) => {
        try {
          const dataField = request.body.DATA;

          if (dataField && typeof dataField.value === 'string') {
            const parsedData = JSON.parse(dataField.value);
            request.body = { ...request.body, ...parsedData };
          } else {
            return reply
              .status(400)
              .send({ message: 'Campo DATA es requerido y debe ser un string JSON.' });
          }
          return true;
        } catch (error) {
          return reply
            .status(400)
            .send({ message: 'Error al parsear los datos JSON en el campo DATA route.' });
        }
      },
    },
    solicitudesRevEquiv.createEquivalencia,
  );

  fastify.get(
    '/:equivalenciaId',
    {
      schema: solicitudesSchema.findOneEquivalenciaSchema,
    },
    solicitudesRevEquiv.findOneEquivalencia,
  );
  fastify.get(
    '/equivalencias',
    {
      schema: solicitudesSchema.findAllEquivalenciasSchema,
    },
    solicitudesRevEquiv.findAllEquivalencias,
  );
  await fastify.delete(
    '/:equivalenciaId',
    {
      schema: solicitudesSchema.deleteEquivalenciaSchema,
    },
    solicitudesRevEquiv.deleteEquivalencia,
  );
  next();
}

module.exports = solicitudesRevEquivRouter;
