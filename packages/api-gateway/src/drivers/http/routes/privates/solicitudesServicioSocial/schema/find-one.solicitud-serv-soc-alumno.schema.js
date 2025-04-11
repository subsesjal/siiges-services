const { solicitudServicioSocialAlumno } = require('./properties/solicitudServicioSocialAlumno');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { grado } = require('../../grupos/schema/properties/grado');
const { modalidadServicioSocial } = require('./properties/modalidadServicioSocial');
const { sectorServicioSocial } = require('./properties/sectorServicioSocial');
const { ejeServicioSocial } = require('./properties/ejeServicioSocial');
const { dimensionServicioSocial } = require('./properties/dimensionServicioSocial');
const { responseProperties } = require('./properties/responseProperties');

const findOneSolicitudServSocAlumnoSchema = {
  tags: ['Solicitudes Servicio Social'],
  description:
    'Obtiene el dato de un alumno asignado a una solicitud servicio social. Se requiere el id de la solicitud, y el id de solicitud servicio social alumno.',
  params: {
    type: 'object',
    properties: {
      solicitudServicioSocialId: { type: 'integer' },
      solicitudesServicioSocialAlumnosId: { type: 'integer' },
    },
    required: ['solicitudServicioSocialId', 'solicitudesServicioSocialAlumnosId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...solicitudServicioSocialAlumno,
            alumno: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...alumno,
                ...responseProperties,
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
};

module.exports = findOneSolicitudServSocAlumnoSchema;
