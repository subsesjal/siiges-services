const { inspectoresProgramas } = require('./properties/inspectoresProgramas');
const { responseProperties } = require('./properties/responseProperties');

const updateInspectoresProgramasSchema = {
  tags: ['inspectores'],
  description: 'Update a inspector program',
  params: {
    title: 'Update Inspector Program',
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
    required: ['id'],
  },
  body: {
    title: 'Data to update Inspector Program',
    type: 'object',
    properties: {
      ...inspectoresProgramas,
    },
  },
  reponse: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          properties: {
            id: { type: 'integer' },
            ...inspectoresProgramas,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateInspectoresProgramasSchema;
