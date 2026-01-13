const { domicilio } = require('../../../privates/solicitudes/representantes/schemas/properties/domicilio.properties');
const { persona } = require('../../../privates/usuarios/schema/properties/persona');
const { solicitudRevEquiv } = require('../../../privates/solicitudesRevEquiv/schema/properties/solicitudRevEquiv');
const { responseProperties } = require('../../../privates/solicitudesRevEquiv/schema/properties/responseProperties');
const { institucionProcedencia } = require('../../../privates/solicitudesRevEquiv/schema/properties/institucionProcedencia');
const { institucionDestino } = require('../../../privates/solicitudesRevEquiv/schema/properties/institucionDestino');
const { asignaturaAntecedenteEquivalente } = require('../../../privates/solicitudesRevEquiv/schema/properties/asignaturaAntecedenteEquivalente');
const { institucionDestinoPrograma } = require('../../../privates/solicitudesRevEquiv/schema/properties/institucionDestinoPrograma');

const findSolicitudRevEquivSchema = {
  type: 'object',
  description: 'Consulta pública por folio',
  querystring: {
    type: 'object',
    properties: {
      folioSolicitud: { type: 'string' },
    },
    required: ['folioSolicitud'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitudRevEquiv,
            ...responseProperties,
            interesado: {
              type: 'object',
              properties: {
                persona: {
                  type: 'object',
                  properties: {
                    ...persona,
                    ...responseProperties,
                    domicilio: {
                      type: 'object',
                      properties: {
                        ...domicilio,
                        ...responseProperties,
                      },
                    },
                  },
                },
                institucionProcedencia: {
                  type: 'object',
                  properties: {
                    ...institucionProcedencia,
                    ...responseProperties,
                  },
                },
                institucionDestino: {
                  type: 'object',
                  properties: {
                    ...institucionDestino,
                    ...responseProperties,
                    institucionDestinoPrograma: {
                      type: ['object', 'null'],
                      properties: {
                        ...institucionDestinoPrograma,
                        ...responseProperties,
                      },
                    },
                  },
                },
                asignaturasAntecedenteEquivalente: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      ...asignaturaAntecedenteEquivalente,
                      ...responseProperties,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findSolicitudRevEquivSchema;
