const { solicitudRevEquiv } = require('./properties/solicitudRevEquiv');
const { interesado } = require('./properties/interesado');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { persona } = require('../../usuarios/schema/properties/persona');
const { institucionProcedencia } = require('./properties/institucionProcedencia');
const { institucionDestino } = require('./properties/institucionDestino');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { institucion } = require('../../instituciones/schema/properties/institucion');
const { asignaturaAntecedenteEquivalente } = require('./properties/asignaturaAntecedenteEquivalente');
const { responseProperties } = require('./properties/responseProperties');

const findAllSolicitudesRevEquivSchema = {
  tags: ['Solicitudes Rev Equiv'],
  description: 'Return a list of equivalencias.',
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...solicitudRevEquiv,
              ...responseProperties,
              interesado: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...interesado,
                  ...responseProperties,
                  persona: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...persona,
                      ...responseProperties,
                      domicilio: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          ...domicilio,
                          ...responseProperties,
                        },
                      },
                    },
                  },
                  institucionProcedencia: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...institucionProcedencia,
                      ...responseProperties,
                    },
                  },
                  institucionDestino: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...institucionDestino,
                      ...responseProperties,
                      programa: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          ...programa,
                          ...responseProperties,
                          plantel: {
                            type: 'object',
                            properties: {
                              id: { type: 'integer' },
                              ...plantel,
                              ...responseProperties,
                              institucion: {
                                type: 'object',
                                properties: {
                                  id: { type: 'integer' },
                                  ...institucion,
                                  ...responseProperties,
                                },
                              },
                              domicilio: {
                                type: 'object',
                                properties: {
                                  id: { type: 'integer' },
                                  ...domicilio,
                                  ...responseProperties,
                                },
                              },
                            },
                          },
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
  },
};

module.exports = findAllSolicitudesRevEquivSchema;
