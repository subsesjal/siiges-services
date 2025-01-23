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
            asignaturaEquivalentePrograma: {
              type: 'object',
              properties: {
                ...asignaturaEquivalentePrograma,
                asignatura: {
                  type: 'object',
                  properties: {
                    programaId: { type: 'integer' },
                    gradoId: { type: 'integer' },
                    areaId: { type: 'integer' },
                    academia: { type: 'string' },
                    consecutivo: { type: 'integer' },
                    nombre: { type: 'string' },
                    clave: { type: 'string' },
                    seriacion: { type: 'string' },
                    objetivo: { type: 'string' },
                    temas: { type: 'string' },
                    actividades: { type: 'string' },
                    modeloInstruccional: { type: 'string' },
                    horasDocente: { type: 'integer' },
                    horasIndependiente: { type: 'integer' },
                    creditos: { type: 'integer' },
                    tipo: { type: 'integer' },
                    fechaAutorizacion: { type: 'string', format: 'date-time' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time', nullable: true },
                    deletedAt: { type: 'string', format: 'date-time', nullable: true },
                  },
                  required: [
                    'programaId',
                    'gradoId',
                    'areaId',
                    'nombre',
                    'clave',
                  ],
                },
              },
              required: ['asignaturaAntecedenteEquivalenteId', 'asignaturaId'],
            },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createSolicitudFolioSchema;
