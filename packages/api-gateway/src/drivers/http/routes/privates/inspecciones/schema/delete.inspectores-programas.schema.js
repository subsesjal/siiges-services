const { inspectoresProgramas } = require('./properties/inspectorPrograma');
const { responseProperties } = require('./properties/responseProperties');

const deleteInspectoresProgramasSchema = {
  tags: ['Inspecciones'],
  description: 'Delete a inspector programs',
  params: {
    title: 'delete Inspector Program',
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
    required: ['id'],
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

module.exports = { deleteInspectoresProgramasSchema };
