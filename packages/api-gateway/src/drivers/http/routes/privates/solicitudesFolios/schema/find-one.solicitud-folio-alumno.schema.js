const { solicitudFolioAlumno } = require('./properties/solicitudFolioAlumno');
const { responseProperties } = require('./properties/responseProperties');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');

const findOneAlumnoSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Return a solicitud folio alumno with academic and institutional data',
  params: {
    type: 'object',
    properties: {
      solicitudFolioAlumnoId: { type: 'integer' },
    },
    required: ['solicitudFolioAlumnoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitudFolioAlumno,
            ...responseProperties,
            tipoSolicitudFolio: {
              type: 'string',
              description: 'Tipo de solicitud de folio',
            },
            tipoDocumento: {
              type: 'string',
              description: 'Tipo de documento (certificado, titulo, etc)',
            },

            folioDocumentoAlumno: {
              type: 'object',
              properties: {
                folioDocumento: {
                  type: 'string',
                  description: 'Folio compuesto del documento',
                },
              },
            },
            alumno: {
              type: 'object',
              properties: {
                ...alumno,
                ...responseProperties,
                persona: {
                  type: 'object',
                  properties: {
                    ...persona,
                    ...responseProperties,
                  },
                },

                programa: {
                  type: 'object',
                  properties: {
                    nombre: { type: 'string' },
                    acuerdo_rvoe: { type: 'string' },

                    nivel: {
                      type: 'object',
                      properties: {
                        nombre: { type: 'string' },
                      },
                    },

                    plantel: {
                      type: 'object',
                      properties: {
                        clave_centro_trabajo: { type: 'string' },

                        domicilio: {
                          type: 'object',
                          properties: {
                            calle: { type: 'string' },
                            numero_exterior: { type: 'string' },
                            numero_interior: { type: 'string' },
                            colonia: { type: 'string' },
                          },
                        },

                        institucion: {
                          type: 'object',
                          properties: {
                            nombre: { type: 'string' },
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
    },
  },
};

module.exports = findOneAlumnoSchema;
