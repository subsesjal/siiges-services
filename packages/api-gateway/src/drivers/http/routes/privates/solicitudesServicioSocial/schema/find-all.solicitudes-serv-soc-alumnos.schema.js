const { solicitudServicioSocialAlumno } = require('./properties/solicitudServicioSocialAlumno');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona'); // Asegúrate de que esta ruta sea correcta
const { grado } = require('../../grupos/schema/properties/grado');
const { modalidadServicioSocial } = require('./properties/modalidadServicioSocial');
const { sectorServicioSocial } = require('./properties/sectorServicioSocial');
const { ejeServicioSocial } = require('./properties/ejeServicioSocial');
const { dimensionServicioSocial } = require('./properties/dimensionServicioSocial');
const { responseProperties } = require('./properties/responseProperties');

const findAllSolicitudesServSocAlumnoSchema = {
  tags: ['Solicitudes Servicio Social'],
  description: 'Obtiene una lista de todas los alumnos asociados a una solicitud servicio social.',
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
              ...solicitudServicioSocialAlumno,
              ...responseProperties,
              alumno: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...alumno,
                  ...responseProperties,
                  persona: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...persona,
                      ...responseProperties,
                    },
                  },
                },
              },
              grado: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...grado,
                  ...responseProperties,
                },
              },
              modalidadServicioSocial: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...modalidadServicioSocial,
                  ...responseProperties,
                },
              },
              sectorServicioSocial: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...sectorServicioSocial,
                  ...responseProperties,
                },
              },
              ejeServicioSocial: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...ejeServicioSocial,
                  ...responseProperties,
                  dimensionServicioSocial: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...dimensionServicioSocial,
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

module.exports = findAllSolicitudesServSocAlumnoSchema;
