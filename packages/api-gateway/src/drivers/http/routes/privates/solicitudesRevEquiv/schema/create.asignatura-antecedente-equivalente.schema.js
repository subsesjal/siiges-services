const { asignaturaAntecedenteEquivalente } = require('./properties/asignaturaAntecedenteEquivalente');
const { asignaturaEquivalentePrograma } = require('./properties/asignaturaEquivalentePrograma');
const { responseProperties } = require('./properties/responseProperties');

const createAsignaturaAntecedenteEquivalenteSquema = {
  tags: ['Solicitudes Antecedente Asignaturas'],
  description: 'This endpoint allows the creation of a new record for an equivalent antecedent subject in the system.',
  body: {
    type: 'object',
    properties: {
      ...asignaturaAntecedenteEquivalente,
      ...asignaturaEquivalentePrograma,
    },
    required: [
      'interesadoId',
      'nombreAsignaturaEquivalente',
      'calificacionEquivalente',
      'nombreAsignaturaAntecedente',
      'calificacionAntecedente',
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...asignaturaAntecedenteEquivalente,
            ...responseProperties,
            ...asignaturaEquivalentePrograma,
          },
        },
      },
    },
  },
};

module.exports = { createAsignaturaAntecedenteEquivalenteSquema };
