const { asignaturaAntecedenteEquivalente } = require('./properties/asignaturaAntecedenteEquivalente');
const { asignaturaEquivalentePrograma } = require('./properties/asignaturaEquivalentePrograma');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudFolioSchema = {
  tags: ['Solicitudes Antecedente Asignaturas'],
  description: 'Given an object with solicitud equivalencia the first time a new solicitud in database.',
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

module.exports = createSolicitudFolioSchema;
