const { responseProperties } = require('../../orgColegiados/schema/properties/responseProperties');
const { responsable } = require('./properties/responsables');

const createResponsablesSchema = {
  tags: ['Planes Maestros'],
  description: 'Create responsables.',
  params: {
    type: 'object',
    properties: {
      planMaestroId: { type: 'integer' },
    },
    required: ['planMaestroId'],
  },
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      planeacion: {
        type: 'object',
        properties: {
          ...responsable,
        },
      },
      obraYMantenimiento: {
        type: 'object',
        properties: {
          ...responsable,
        },
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            planeacion: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...responsable,
                ...responseProperties,
              },
            },
            obraYMantenimiento: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...responsable,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { createResponsablesSchema };
